import * as React from "react";

import { Link, PageProps, graphql } from "gatsby";

import { Layout } from "~components";
import { Tag } from "../../templates/tags";

type TagIndexProps = PageProps<Queries.TagIndexQuery>;
type Tag = TagIndexProps["data"]["allMdx"]["group"][0];
type TagIndexComponent = React.FC<TagIndexProps>;

const TagIndex: TagIndexComponent = ({ data }) => {
  const count = data.allMdx.group.length;

  const TagEntry = ({ name, totalCount }: Tag) => {
    if (!name) {
      throw new Error("Tag name is NULL");
    }
    return (
      <li key={name}>
        <Link to={`/tags/${name}`}>
          <Tag name={name} />
        </Link>{" "}
        ({totalCount})
      </li>
    );
  };

  return (
    <Layout pageTitle="Tags">
      <p>There are the follogwing {count} tags:</p>
      <ul>
        {data.allMdx.group.map((tag: Tag) =>
          tag.name ? <TagEntry {...tag} /> : undefined
        )}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query TagIndex {
    allMdx {
      group(field: { frontmatter: { tags: SELECT } }) {
        name: fieldValue
        totalCount
      }
    }
  }
`;

export default TagIndex;
