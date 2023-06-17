import * as React from "react";

import { Link, PageProps, graphql } from "gatsby";
import { GatsbyImage, ImageDataLike, getImage } from "gatsby-plugin-image";

import { Layout, Seo } from "~components";

type BlogPageProps = PageProps<Queries.BlogPostsQuery>;
interface PreviewProps {
  node: BlogPostNode;
}

type BlogPostNode = Queries.BlogPostsQuery["allMdx"]["nodes"][0];

const Preview = ({ node }: PreviewProps) => {
  const image = getImage(node.frontmatter.hero_image as ImageDataLike);

  const teaser = image ? (
    <div className="w-[140px] p-[5px] shrink-0">
      <GatsbyImage
        imgClassName="rounded-md"
        image={image}
        alt={node.frontmatter.hero_image_alt}
      />
    </div>
  ) : (
    <div className="w-[140px] p-[5px] shrink-0"></div>
  );

  return (
    <article style={{ display: "flex", alignItems: "center" }}>
      {teaser}
      <div>
        <h2 className="text-base sm:text-lg md:text-xl">
          <Link to={`${node.frontmatter.date}-${node.frontmatter.slug}`}>
            {node.frontmatter.title}
          </Link>
        </h2>
        <p className="text-xs md:text-sm">Posted: {node.frontmatter.date}</p>
        <p className="hidden md:block md:text-sm">{node.excerpt}</p>
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
