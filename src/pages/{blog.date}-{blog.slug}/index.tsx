import * as React from "react";

import { Link, PageProps, graphql } from "gatsby";
import { GatsbyImage, ImageDataLike, getImage } from "gatsby-plugin-image";
import { Icon } from "@iconify-icon/react";

import { Layout, Comments, MDXWrapper, Seo } from "~components";
import { Tag } from "../../templates/tags";

type BlogPostProps = React.PropsWithChildren<
  PageProps<Queries.BlogPostByIdQuery>
>;

const BlogPost = ({ data, children }: BlogPostProps) => {
  if (!data.blog) {
    throw new Error("No MDX data");
  }

  const image = getImage(data.blog.heroImage.image as ImageDataLike);

  // TODO: Make this a component
  const hero = image ? (
    <div className="relative max-w-100% mb-[-200px] md:w-[var(--box-width)] m-auto md:left-[calc((var(--content-width)-var(--box-width))/2)]">
      <GatsbyImage
        image={image}
        className="rounded-t-lg"
        alt={data.blog.heroImage.alt}
      />
      <div className="absolute z-10 top-0 left-0 bg-[rgba(255,255,255,0.25)] backdrop-blur p-2 rounded-tl-lg rounded-br-md ">
        <Icon icon="mdi:calendar-edit" inline />
        {data.blog.date};{" "}
        <Link className="z-20" to={`/author/${data.blog.author?.slug}`}>
          <Icon icon="mdi:account-edit" inline />
          {data.blog.author?.firstName} {data.blog.author?.lastName}
        </Link>
      </div>
      <p className="absolute z-10 top-0 right-0 bg-[rgba(255,255,255,0.25)] backdrop-blur p-2 rounded-tr-lg rounded-bl-md">
        <a href={data.blog.heroImage.link}>
          <Icon icon="mdi:camera" inline />
          {data.blog.heroImage.credit}
        </a>
      </p>
    </div>
  ) : null;

  const tags = data.blog.tags.map((tag: string) => (
    <Tag key={tag} name={tag} />
  ));

  return (
    <Layout pageTitle={data.blog.title}>
      {hero}
      <div className="flex justify-around bg-[rgba(255,255,255,0.20)] backdrop-blur p-2 my-2 rounded-md">
        {tags}
      </div>
      <article className="z-10 rounded-t-md bg-[rgba(255,255,255,0.25)] backdrop-blur p-2 text-justify">
        <MDXWrapper>{children}</MDXWrapper>
      </article>
      <Comments />
    </Layout>
  );
};

export const query = graphql`
  query BlogPostById($id: String) {
    blog(id: { eq: $id }) {
      tags
      date
      title
      author {
        slug
        firstName
        lastName
      }
      heroImage {
        link
        credit
        alt
        image {
          childImageSharp {
            gatsbyImageData(width: 800)
          }
        }
      }
    }
  }
`;

export const Head = ({ data }: BlogPostProps) => {
  if (!data.blog) {
    throw new Error("No Blog data");
  }

  return <Seo title={data.blog.title} />;
};

export default BlogPost;
