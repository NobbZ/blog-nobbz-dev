import { GatsbyNode, NodeInput } from "gatsby";
import { IMdxNode } from "gatsby-plugin-mdx/dist/types";
import { FileSystemNode } from "gatsby-source-filesystem";

type SourceTypes = "blog" | "author";

interface BlogFrontmatter {
  title: string;
  slug: string;
  date: Date;
  tags: string[];
  hero_image_alt: string;
  hero_image_link: string;
  hero_image_credit_link: string;
  hero_image_credit: string;
  hero_image: FileSystemNode;
}

interface AuthorFrontmatter {
  slug: string;
  first_name?: string;
  last_name?: string;
  nick_name?: string;
  social?: Record<string, string | Record<string, unknown>>;
}

interface MdxNodeWithSource<T> extends IMdxNode {
  fields: { source: SourceTypes; readingTime: unknown };
  frontmatter: T;
}

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions, schema }) => {
    const { createTypes } = actions;

    const typeDefs = `
      type HeroImageData {
        alt: String!
        link: String!
        credit: String!
        creditLink: String!
      }

      type Blog implements Node {
        title: String!
        slug: String!
        date: Date!
        tags: [String!]!
        heroImage: HeroImageData!
        excerpt: String
      }

      type Author implements Node {
        slug: String!
        firstName: String!
        lastName: String!
        nickName: String
        social: JSON
      }
    `;

    createTypes(typeDefs);
  };

export const shouldOnCreateNode: GatsbyNode<
  MdxNodeWithSource<BlogFrontmatter>
>["shouldOnCreateNode"] = ({ node }) => {
  return node.internal.type === "Mdx" && !!node.parent;
};

export const onCreateNode: GatsbyNode<IMdxNode>["onCreateNode"] = async ({
  node,
  actions,
  createNodeId,
  getNode,
  cache,
}) => {
  const createBlogNode = async (
    node: MdxNodeWithSource<BlogFrontmatter>
  ): Promise<NodeInput> => {
    return {
      id: createNodeId(`${node.id} >>> blog`),
      children: [],
      parent: node.id,
      internal: {
        type: "Blog",
        contentDigest: node.internal.contentDigest,
        contentFilePath: node.internal.contentFilePath,
      },
      title: node.frontmatter.title,
      slug: node.frontmatter.slug,
      date: node.frontmatter.date,
      tags: node.frontmatter.tags,
      // TODO: Excerpt seems to be generated lazily on query time, so we need to re-map a resolver later
      excerpt: "",
      readingTime: node.fields.readingTime,
      heroImage: {
        alt: node.frontmatter.hero_image_alt,
        link: node.frontmatter.hero_image_link,
        creditLink: node.frontmatter.hero_image_credit_link,
        credit: node.frontmatter.hero_image_credit,
        image: node.frontmatter.hero_image as FileSystemNode,
      },
    };
  };

  const createAuthorNode = async (
    node: MdxNodeWithSource<AuthorFrontmatter>
  ): Promise<NodeInput> => {
    return {
      id: createNodeId(`${node.id} >>> author`),
      internal: {
        type: "Author",
        contentDigest: node.internal.contentDigest,
        contentFilePath: node.internal.contentFilePath,
      },
      slug: node.frontmatter.slug,
      firstName: node.frontmatter.first_name,
      lastName: node.frontmatter.last_name,
      nickName: node.frontmatter.nick_name,
      social: node.frontmatter.social,
    };
  };

  const nodeCreator: (
    sourceType: SourceTypes,
    node: IMdxNode
  ) => Promise<NodeInput> = async (sourceType, node) => {
    switch (sourceType) {
      case "blog":
        return createBlogNode(node as MdxNodeWithSource<BlogFrontmatter>);

      case "author":
        return createAuthorNode(node as MdxNodeWithSource<AuthorFrontmatter>);

      default:
        throw new Error(`Unknown source type ${sourceType}`);
    }
  };

  if (!node.parent) {
    throw new Error("Node has no parent");
  }

  const { createNode, createParentChildLink } = actions;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { sourceInstanceName: source } = getNode(
    node.parent
  )! as FileSystemNode;

  const newNode = await nodeCreator(source as unknown as SourceTypes, node);

  createNode(newNode);
  createParentChildLink({ parent: node, child: newNode });
  await cache.set(`mdxToSplit-${node.internal.contentFilePath}`, newNode);
};
