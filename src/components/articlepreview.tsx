import * as React from "react";

import { Link, graphql } from "gatsby";
import { GatsbyImage, ImageDataLike, getImage } from "gatsby-plugin-image";

import { Tag } from "../templates/tags";

type BlogPostNode = Queries.PreviewDataFragment;
interface PreviewProps {
  node: BlogPostNode;
}

export const Preview = ({ node }: PreviewProps) => {
  const image = getImage(node.heroImage.image as ImageDataLike);

  const to = `/${node.date}-${node.slug}`;

  const teaser = image ? (
    <div className="w-[140px] p-[5px] shrink-0">
      <Link to={to}>
        <GatsbyImage
          imgClassName="rounded-md"
          image={image}
          alt={node.heroImage.alt}
        />
      </Link>
    </div>
  ) : (
    <div className="w-[140px] p-[5px] shrink-0"></div>
  );

  const tags = node.tags.map((tag) =>
    tag ? (
      <li key={`li-${tag}`}>
        <Tag key={tag} name={tag} />
      </li>
    ) : undefined
  );

  const text =
    node.readingTime && node.readingTime.text
      ? node.readingTime.text
      : undefined;
  const readingTime = text ? `; ${text}` : undefined;

  return (
    <article style={{ display: "flex", alignItems: "center" }}>
      {teaser}
      <div className="grow-1 w-full">
        <h2 className="text-base sm:text-lg md:text-xl">
          <Link to={to}>{node.title}</Link>
        </h2>
        <p className="text-xs md:text-sm">
          Posted: {node.date}
          {readingTime}
        </p>
        <p className="hidden md:block md:text-sm">{node.excerpt}</p>
      </div>
      <div className="w-[100px] shrink-0 text-right">
        <ul>{tags}</ul>
      </div>
    </article>
  );
};

export const query = graphql`
  fragment PreviewData on Blog {
    date
    excerpt
    slug
    tags
    title
    heroImage {
      alt
      image {
        childImageSharp {
          gatsbyImageData(width: 200)
        }
      }
    }
    readingTime {
      text
    }
  }
`;
