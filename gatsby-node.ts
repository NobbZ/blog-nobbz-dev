import { GatsbyNode } from "gatsby";

import path from "path";

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions }) => {
    actions.createTypes(`
      type Query {
        site: Site!
      }

      type Mdx implements Node {
        frontmatter: MdxFrontmatter!
      }

      type MdxFrontmatter {
        date: Date! @dateformat
        title: String!
        slug: String!
        tags: [String!]!
        hero_image_alt: String!
        hero_image_link: String!
      }

      type Site implements Node {
        siteMetadata: SiteSiteMetadata!
      }

      type SiteSiteMetadata {
        title: String!
      }
    `);
  };

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({
  stage,
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "~components": `${__dirname}/src/components`,
        "~pages": `${__dirname}/src/pages`,
      },
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
  });
};

export const createPages: GatsbyNode["createPages"] = async ({
  actions,
  graphql,
  reporter,
}) => {
  const { createPage } = actions;

  const tagTemplate = path.resolve("src/templates/tags.tsx");

  const result: { errors?: unknown; data?: Queries.TagListQuery } =
    await graphql(`
      query TagList {
        allMdx {
          group(field: { frontmatter: { tags: SELECT } }) {
            name: fieldValue
            totalCount
          }
        }
      }
    `);

  if (result.errors || !result.data) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
    return;
  }

  const tags = result.data.allMdx.group;

  tags.forEach((tag: Queries.TagListQuery["allMdx"]["group"][0]) => {
    createPage({
      path: `/tags/${tag.name}/`,
      component: tagTemplate,
      context: {
        tag: tag.name,
      },
    });
  });
};
