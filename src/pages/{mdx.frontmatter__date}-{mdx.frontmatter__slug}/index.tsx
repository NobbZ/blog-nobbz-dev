import * as React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, ImageDataLike, getImage } from "gatsby-plugin-image";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import Pre from "../../components/pre";
import { MDXProvider } from "@mdx-js/react";
import { Components } from "@mdx-js/react/lib";
import { Comments } from "../../components/comments";

import { article, hero as heroClass, quote } from "./article.module.css";

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
    return (
      <blockquote className={quote} {...props}>
        {children}
      </blockquote>
    );
  },
};

const BlogPost = ({ data, children }: BlogPostProps) => {
  const image = getImage(data.mdx.frontmatter.hero_image);

  // TODO: Make this a component
  const hero = image ? (
    <div className={heroClass}>
      <GatsbyImage image={image} alt={data.mdx.frontmatter.hero_image_alt} />
      <p>
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
      <article className={article}>
        <MDXProvider components={components}>{children}</MDXProvider>
      </article>
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
