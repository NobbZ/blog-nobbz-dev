import { GatsbyNode } from "gatsby";

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
