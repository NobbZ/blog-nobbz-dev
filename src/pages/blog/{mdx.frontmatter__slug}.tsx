import * as React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, ImageDataLike, getImage } from "gatsby-plugin-image";
import Layout from "../../components/layout";
import Seo from "../../components/seo";

type BlogPostByIdData = {
  mdx: {
    frontmatter: {
      title: string;
      date: string;
      hero_image: ImageDataLike;
      hero_image_alt: string;
      hero_image_credit_url: string;
      hero_image_credit_text: string;
    };
  };
};

type BlogPostProps = {
  data: BlogPostByIdData;
  children: React.ReactNode;
};

type BlogPostHeadProps = Pick<BlogPostProps, "data">;

const BlogPost = ({ data, children }: BlogPostProps) => {
  const image = getImage(data.mdx.frontmatter.hero_image);

  if (!image) {
    // TODO: Replace with a default image or not render the image at all
    throw new Error("Hero image is missing");
  }

  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <p>Posted: {data.mdx.frontmatter.date}</p>
      <GatsbyImage image={image} alt={data.mdx.frontmatter.hero_image_alt} />
      <p>
        Photo Credit:{" "}
        <a href={data.mdx.frontmatter.hero_image_credit_url}>
          {data.mdx.frontmatter.hero_image_credit_text}
        </a>
      </p>
      {children}
    </Layout>
  );
};

export const query = graphql`
  query BlogPostById($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        hero_image_alt
        hero_image_credit_url
        hero_image_credit_text
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`;

export const Head = ({ data }: BlogPostHeadProps) => (
  <Seo title={data.mdx.frontmatter.title} />
);

export default BlogPost;
