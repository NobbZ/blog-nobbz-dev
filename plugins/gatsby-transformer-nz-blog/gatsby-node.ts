import { GatsbyNode, NodeInput } from "gatsby";

import { IMdxNode } from "gatsby-plugin-mdx/dist/types";
import { FileSystemNode } from "gatsby-source-filesystem";

interface BlogParentNode extends IMdxNode {
  parent: string;
  fields: { readingTime: unknown };
  frontmatter: {
    author: string;
    title: string;
    slug: string;
    date: Date;
    tags: string[];
    hero_image_alt: string;
    hero_image_link: string;
    hero_image_credit_link: string;
    hero_image_credit: string;
    hero_image: FileSystemNode;
  };
}

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions }) => {
    const { createTypes } = actions;

    createTypes(`
      type HeroImageData {
        alt: String!
        link: String!
        credit: String!
        creditLink: String!
      }

      type Blog implements Node {
        title: String!
        author: Author @link(by: "slug")
        slug: String!
        date: Date!
        tags: [String!]!
        heroImage: HeroImageData!
        excerpt: String
      }
    `);
  };

export const shouldOnCreateNode: GatsbyNode<IMdxNode>["shouldOnCreateNode"] = ({
  node,
}) => {
  return (
    node.internal.type === "Mdx" &&
    !!node.parent &&
    // node.parent.sourceInstanceName === "blog"
    (node.fields as undefined | { source: string })?.source === "blog"
  );
};

export const onCreateNode: GatsbyNode<BlogParentNode>["onCreateNode"] = async ({
  node,
  actions,
  createNodeId,
}) => {
  const { createNode, createParentChildLink } = actions;

  const blogNode: NodeInput = {
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
    author: node.frontmatter.author,
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

  createNode(blogNode);
  createParentChildLink({ parent: node, child: blogNode });
};
