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

// type BlogPostsQuery = {
//   readonly allMdx: {
//     readonly nodes: ReadonlyArray<{
//       readonly id: string;
//       readonly excerpt: string | null;
//       readonly frontmatter: {
//         readonly date: string | null;
//         readonly title: string | null;
//         readonly slug: string | null;
//         readonly hero_image_alt: string | null;
//         readonly hero_image: {
//           readonly childImageSharp: {
//             readonly gatsbyImageData: import("gatsby-plugin-image").IGatsbyImageData;
//           } | null;
//         } | null;
//       } | null;
//     }>;
//   };
// };
