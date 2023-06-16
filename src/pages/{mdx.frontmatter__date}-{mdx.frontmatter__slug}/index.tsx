import * as React from "react";

import { PageProps, graphql } from "gatsby";
import { GatsbyImage, ImageDataLike, getImage } from "gatsby-plugin-image";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import { Comments } from "../../components/comments";

import MDXWrapper from "../../components/mdxwrapper";

type BlogPostProps = React.PropsWithChildren<
  PageProps<Queries.BlogPostByIdQuery>
>;

const BlogPost = ({ data, children }: BlogPostProps) => {
  if (!data.mdx) {
    throw new Error("No MDX data");
  }

  const image = getImage(data.mdx.frontmatter.hero_image as ImageDataLike);

  // TODO: Make this a component
  const hero = image ? (
    <div className="relative z-[-1] max-w-100% mb-[-200px] md:w-[var(--box-width)] m-auto md:left-[calc((var(--content-width)-var(--box-width))/2)]">
      <GatsbyImage
        image={image}
        className="rounded-t-lg"
        alt={data.mdx.frontmatter.hero_image_alt}
      />
      <p className="absolute top-0 left-0 bg-[rgba(255,255,255,0.25)] backdrop-blur p-2 rounded-tl-lg rounded-br-md">
        {data.mdx.frontmatter.date}
      </p>
      <p className="absolute top-0 right-0 bg-[rgba(255,255,255,0.25)] backdrop-blur p-2 rounded-tr-lg rounded-bl-md">
        <a href={data.mdx.frontmatter.hero_image_link}>
          {data.mdx.frontmatter.hero_image_credit}
        </a>
      </p>
    </div>
  ) : null;

  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      {hero}
      <article className="z-10 rounded-t-md bg-[rgba(255,255,255,0.25)] backdrop-blur p-2 text-justify">
        <MDXWrapper>{children}</MDXWrapper>
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

export const Head = ({ data }: BlogPostProps) => (
  <Seo title={data.mdx!.frontmatter.title} />
);

export default BlogPost;
