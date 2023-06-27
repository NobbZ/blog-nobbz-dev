import * as React from "react";
import * as R from "ramda";

import { Link, graphql } from "gatsby";
import sha256 from "crypto-js/sha256";
import Base16 from "crypto-js/enc-hex";
import { Icon } from "@iconify-icon/react";

import { Layout } from "~components/layout";
import { ArticlePreview } from "~components/index";
import { combineClasses } from "~components/mdxwrapper";

interface PageContext {
  tag: string;
}

type TagListQuery = Queries.TagInfoQuery;
type TagsProps = {
  pageContext: PageContext;
  data: TagListQuery;
};
interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
}
type TagComponent = React.FunctionComponent<TagProps>;

// TODO: Move this to a component file
export const Tag: TagComponent = ({ name, ...props }) => {
  const color = `#${sha256(name).toString(Base16).slice(0, 6)}`;
  const colorWithAlpha = `${color}80`;

  const style: React.CSSProperties = {
    backgroundColor: colorWithAlpha,
    borderColor: color,
    borderWidth: "1px",
    borderStyle: "solid",
  };

  const mergedStyle = R.mergeLeft(style, props.style || {});

  return (
    <span
      className={combineClasses("rounded-md", props.className)}
      style={mergedStyle}
      {...props}
    >
      <Link to={`/tags/${name}`}>
        {name}
        <Icon style={{ color }} icon="mdi:tag" flip="horizontal" inline />
      </Link>
    </span>
  );
};

export const Tags = ({ pageContext, data }: TagsProps) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMdx;

  const isSingular = totalCount === 1;
  const isOrAre = isSingular ? "is" : "are";
  const postOrPosts = isSingular ? "post" : "posts";

  return (
    <Layout pageTitle={<Tag name={tag} />}>
      <p>
        There {isOrAre} {totalCount} {postOrPosts} with the tag{" "}
        <Tag name={tag} />.
      </p>

      {edges.map(({ node }) => {
        return <ArticlePreview node={node} key={node.id} />;
      })}
      {/*
              This links to a page that does not yet exist.
              You'll come back to it!
            */}
      <Link to="/tags">All tags</Link>
    </Layout>
  );
};

export const pageQuery = graphql`
  query TagInfo($tag: String) {
    allMdx(
      limit: 2000
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          ...PreviewData
        }
      }
    }
  }
`;

export default Tags;
