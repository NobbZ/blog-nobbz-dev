import * as React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, ImageDataLike, getImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import Seo from "../components/seo";
import Pre from "../components/pre";
import { MDXProvider } from "@mdx-js/react";
import { Components } from "@mdx-js/react/lib";
import { Comments } from "../components/comments";

type BlogPostByIdData = {
  mdx: {
    frontmatter: {
      title: string;
      date: string;
      hero_image: ImageDataLike;
      hero_image_alt: string;
      hero_image_link: string;
      hero_image_credit_link: string;
      hero_image_credit: string;
    };
  };
};

type BlogPostProps = {
  data: BlogPostByIdData;
  children: React.ReactNode;
};

type BlogPostHeadProps = Pick<BlogPostProps, "data">;

const components: Components = {
  pre: Pre,
  blockquote: ({
    children,
    ...props
  }: React.BlockquoteHTMLAttributes<HTMLElement>) => {
    const svgD = "M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z";
    // "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z";
    const backgroundImage = `url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="2.25em" height="2.25em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"%3E%3Cpath fill="rgb(52, 152, 219)" d="${svgD}"%2F%3E%3C%2Fsvg%3E')`;

    const width = 625;
    const paddingX = 50 - 4.5;
    const left = (600 - width) / 2 - paddingX;

    return (
      <blockquote
        style={{
          marginInlineStart: "unset",
          marginInlineEnd: "unset",
          marginBlockStart: "unset",
          marginBlockEnd: "unset",
          backgroundImage,
          position: "relative",
          width: `${width}px`,
          left: `${left}px`,
          paddingLeft: `${paddingX}px`,
          paddingRight: `${paddingX}px`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left 9px top 9px",
          backgroundColor: "#f0f7fb",
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
        }}
        {...props}
      >
        {children}
      </blockquote>
    );
  },
};

const BlogPost = ({ data, children }: BlogPostProps) => {
  const image = getImage(data.mdx.frontmatter.hero_image);

  // TODO: Make this a component
  const hero = image ? (
    <div style={{ position: "relative", width: "800px", left: "-100px" }}>
      <GatsbyImage image={image} alt={data.mdx.frontmatter.hero_image_alt} />
      <p>
        Photo Credit:{" "}
        <a href={data.mdx.frontmatter.hero_image_link}>
          {data.mdx.frontmatter.hero_image_credit}
        </a>
      </p>
    </div>
  ) : null;

  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <p>Posted: {data.mdx.frontmatter.date}</p>
      {hero}
      <MDXProvider components={components}>{children}</MDXProvider>
      <Comments />
    </Layout>
  );
};

export const query = graphql`
  query BlogPostById($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date
        hero_image_alt
        hero_image_credit_link
        hero_image_credit
        hero_image_link
        hero_image {
          childImageSharp {
            gatsbyImageData(width: 800)
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
