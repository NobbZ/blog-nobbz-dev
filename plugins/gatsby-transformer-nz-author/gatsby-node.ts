import { GatsbyNode, NodeInput } from "gatsby";

import { IMdxNode } from "gatsby-plugin-mdx/dist/types";

interface AuthorParentNode extends IMdxNode {
  parent: string;
  fields: { readingTime: unknown };
  frontmatter: {
    slug: string;
    first_name?: string;
    last_name?: string;
    nick_name?: string;
    social?: Record<string, string | Record<string, unknown>>;
  };
}

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions }) => {
    const { createTypes } = actions;

    createTypes(`
      type Author implements Node {
        slug: String!
        firstName: String!
        lastName: String!
        nickName: String
        social: JSON
        articles: [Blog] @link(by: "author.slug", from: "slug")
      }
    `);
  };

export const shouldOnCreateNode: GatsbyNode<IMdxNode>["shouldOnCreateNode"] = ({
  node,
}) => {
  return (
    node.internal.type === "Mdx" &&
    !!node.parent &&
    // node.parent.sourceInstanceName === "author"
    (node.fields as undefined | { source: string })?.source === "author"
  );
};

export const onCreateNode: GatsbyNode<AuthorParentNode>["onCreateNode"] = ({
  node,
  actions,
  createNodeId,
}) => {
  const { createNode, createParentChildLink } = actions;

  const authorNode: NodeInput = {
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

  createNode(authorNode);
  createParentChildLink({ parent: node, child: authorNode });
};
