import * as React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, ImageDataLike, getImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import Seo from "../components/seo";
import Pre from "../components/pre";
import { MDXProvider } from "@mdx-js/react";

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

// const components = {
//   code: console.log,
//   pre: console.log,
// };
const components = {
  pre: Pre,
};

const BlogPost = ({ data, children }: BlogPostProps) => {
  const image = getImage(data.mdx.frontmatter.hero_image);

  // TODO: Make this a component
  const hero = image ? (
    <>
      <GatsbyImage image={image} alt={data.mdx.frontmatter.hero_image_alt} />
      <p>
        Photo Credit:{" "}
        <a href={data.mdx.frontmatter.hero_image_credit_url}>
          {data.mdx.frontmatter.hero_image_credit_text}
        </a>
      </p>
    </>
  ) : null;

  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <p>Posted: {data.mdx.frontmatter.date}</p>
      {hero}
      <MDXProvider components={components}>{children}</MDXProvider>
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
