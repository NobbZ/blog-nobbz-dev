import * as React from "react";
import { Link, PageProps, graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { GatsbyImage, ImageDataLike, getImage } from "gatsby-plugin-image";

type BlogPageProps = PageProps<Queries.BlogPostsQuery>;
interface PreviewProps {
  node: BlogPostNode;
}

type BlogPostNode = Queries.BlogPostsQuery["allMdx"]["nodes"][0];

const Preview = ({ node }: PreviewProps) => {
  const image = getImage(node.frontmatter.hero_image as ImageDataLike);

  const style: React.CSSProperties = {
    width: "150px",
    flexShrink: 0,
    marginRight: "1rem",
  };

  const teaser = image ? (
    <div style={style}>
      <GatsbyImage image={image} alt={node.frontmatter.hero_image_alt} />
    </div>
  ) : (
    <div style={style}></div>
  );

  return (
    <article style={{ display: "flex", alignItems: "center" }}>
      {teaser}
      <div>
        <h2>
          <Link to={`${node.frontmatter.date}-${node.frontmatter.slug}`}>
            {node.frontmatter.title}
          </Link>
        </h2>
        <p>Posted: {node.frontmatter.date}</p>
        <p>{node.excerpt}</p>
      </div>
    </article>
  );
};

const BlogPage = ({ data }: BlogPageProps) => {
  return (
    <Layout pageTitle="My Blog Posts">
      {data.allMdx.nodes.map((node: BlogPostNode) => (
        <Preview node={node} key={node.id} />
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
