import * as React from "react";

import { PageProps, graphql } from "gatsby";

import { ArticlePreview, Layout, Seo } from "~components";

type BlogPageProps = PageProps<Queries.BlogPostsQuery>;

type BlogPostNode = Queries.BlogPostsQuery["allMdx"]["nodes"][0];

const BlogPage = ({ data }: BlogPageProps) => {
  return (
    <Layout pageTitle="My Blog Posts">
      {data.allMdx.nodes.map((node: BlogPostNode) => (
        <ArticlePreview node={node} key={node.id} />
      ))}
    </Layout>
  );
};

export const query = graphql`
  query BlogPosts {
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          date
          title
          slug
          tags
          hero_image_alt
          hero_image {
            childImageSharp {
              gatsbyImageData(width: 200)
            }
          }
        }
        id
        excerpt
      }
    }
  }
`;

export const Head = () => <Seo title="My Blog Posts" />;

export default BlogPage;
