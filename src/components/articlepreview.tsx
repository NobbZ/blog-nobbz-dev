import * as React from "react";

import { Link } from "gatsby";
import { GatsbyImage, ImageDataLike, getImage } from "gatsby-plugin-image";

type BlogPostNode = Queries.BlogPostsQuery["allMdx"]["nodes"][0];
interface PreviewProps {
  node: BlogPostNode;
}

export const Preview = ({ node }: PreviewProps) => {
  const image = getImage(node.frontmatter.hero_image as ImageDataLike);

  const to = `${node.frontmatter.date}-${node.frontmatter.slug}`;

  const teaser = image ? (
    <div className="w-[140px] p-[5px] shrink-0">
      <Link to={to}>
        <GatsbyImage
          imgClassName="rounded-md"
          image={image}
          alt={node.frontmatter.hero_image_alt}
        />
      </Link>
    </div>
  ) : (
    <div className="w-[140px] p-[5px] shrink-0"></div>
  );

  return (
    <article style={{ display: "flex", alignItems: "center" }}>
      {teaser}
      <div>
        <h2 className="text-base sm:text-lg md:text-xl">
          <Link to={to}>{node.frontmatter.title}</Link>
        </h2>
        <p className="text-xs md:text-sm">Posted: {node.frontmatter.date}</p>
        <p className="hidden md:block md:text-sm">{node.excerpt}</p>
      </div>
    </article>
  );
};
