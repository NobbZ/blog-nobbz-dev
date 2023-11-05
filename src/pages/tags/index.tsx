import * as React from "react";
import * as R from "ramda";

import { PageProps, graphql } from "gatsby";
import SeedRandom from "seedrandom";

import { Layout } from "~components";
import { Tag } from "../../templates/tags";

type TagIndexProps = PageProps<Queries.TagIndexQuery>;
type TagGroupProps = TagIndexProps["data"]["allMdx"]["group"][0];
type TagIndexComponent = React.FC<TagIndexProps>;

function shuffle<T>(array: readonly T[]): readonly T[] {
  const rng = SeedRandom("tag-cloud");

  // We start at the end of the array and swap each element with a random one
  let currentIndex = array.length;
  let randomIndex = 0;

  const result = array.slice() as T[];

  while (currentIndex !== 0) {
    randomIndex = Math.floor(rng() * currentIndex);
    currentIndex--;

    [result[currentIndex], result[randomIndex]] = [
      result[randomIndex],
      result[currentIndex],
    ];
  }

  return result;
}

const TagCard: React.FC<{
  name: string;
  count: number;
  min: number;
  max: number;
}> = ({ name, count, min, max }) => {
  const weightedBetween = (weight: number, min: number, max: number) =>
    min + (max - min) * weight;

  const weight = (count - min) / (max - min);

  const textSize = `${weightedBetween(weight, 0.75, 2.25)}rem`;
  const opacity = weightedBetween(weight, 0.3, 1);

  const staticCss = "font-mono block px-[0.125rem] py-1 no-underline relative";
  const dynamicCss = "text-[length:var(--text-size)] opacity-[var(--opacity)]";

  const className = `${staticCss} ${dynamicCss}`;
  const style = {
    "--text-size": textSize,
    "--opacity": opacity.toString(),
  } as unknown as React.CSSProperties;

  return (
    <li style={style} className={className}>
      <Tag name={name} />
      &#8239;({count})
    </li>
  );
};

const TagCloud: React.FC<{ data: Queries.TagIndexQuery }> = ({ data }) => {
  const shuffledList = shuffle(data.allMdx.group);
  const sortedByCount = R.sortBy(R.prop("totalCount"), shuffledList);
  const [minPostCount, maxPostCount] = R.juxt([Math.min, Math.max])(
    ...R.map(R.prop("totalCount"), sortedByCount)
  );

  const nameGuard = <T extends TagGroupProps>(
    args: T
  ): args is T & { name: string } => args.name !== null;

  const cardGen = ({ name, totalCount }: TagGroupProps & { name: string }) => (
    <TagCard
      name={name}
      count={totalCount}
      min={minPostCount}
      max={maxPostCount}
    />
  );

  return (
    <ul className="list-none pl-0 flex flex-wrap items-center justify-center">
      {shuffledList.filter(nameGuard).map(cardGen)}
    </ul>
  );
};

// eslint-disable-next-line react/prop-types
const TagIndex: TagIndexComponent = ({ data }) => {
  // eslint-disable-next-line react/prop-types
  const count = data.allMdx.group.length;

  return (
    <Layout pageTitle="Tags">
      <p>There are the follogwing {count} tags:</p>
      <TagCloud data={data} />
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
