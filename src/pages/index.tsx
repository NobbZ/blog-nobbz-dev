import * as React from "react";

import { PageProps, graphql } from "gatsby";

import { ArticlePreview, Layout, Seo } from "~components";

type BlogPageProps = PageProps<Queries.BlogPostsQuery>;

type BlogPostNode = Queries.BlogPostsQuery["allBlog"]["nodes"][0];

const BlogPage = ({ data }: BlogPageProps) => {
  return (
    <Layout pageTitle="My Blog Posts">
      {data.allBlog.nodes.map((node: BlogPostNode) => (
        <ArticlePreview node={node} key={node.id} />
      ))}
    </Layout>
  );
};

export const query = graphql`
  query BlogPosts {
    allBlog(sort: { date: DESC }) {
      nodes {
        id
        ...PreviewData
      }
    }
  }
`;

export const Head = () => <Seo title="My Blog Posts" />;

export default BlogPage;
