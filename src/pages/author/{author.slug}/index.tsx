import * as React from "react";

import { PageProps, graphql } from "gatsby";
import { Icon } from "@iconify-icon/react";

import { ArticlePreview, Layout, MDXWrapper } from "~components";
import type { BlogPostNode } from "~components/articlepreview";

type AuthorPageProps = PageProps<Queries.AuthorInfoByIdQuery>;

// TODO: properly abstract this
const getSocialLink = (
  platform: string,
  data: string | Record<string, string>
) => {
  switch (platform) {
    case "twitter":
      if (typeof data !== "string") {
        throw new Error("Twitter handle is not a string");
      }

      return (
        <a href={`https://twitter.com/${data}`} key={platform}>
          <Icon icon="mdi:twitter" /> {data}
        </a>
      );
    case "github":
      if (typeof data !== "string") {
        throw new Error("GitHub handle is not a string");
      }

      return (
        <a href={`https://github.com/${data}`} key={platform}>
          <Icon icon="mdi:github" /> {data}
        </a>
      );
    case "gitlab":
      if (typeof data !== "string") {
        throw new Error("GitLab handle is not a string");
      }

      return (
        <a href={`https://gitlab.com/${data}`} key={platform}>
          <Icon icon="mdi:gitlab" /> {data}
        </a>
      );
    case "web":
      if (typeof data === "string") {
        throw new Error("Web data is not an object");
      }

      return (
        <a href={data.url} key={platform}>
          <Icon icon="mdi:web" /> {data.name}
        </a>
      );
  }

  throw new Error(`Unknown social platform: ${platform}`);
};

const AuthorPage = ({ data, children }: AuthorPageProps) => {
  if (!data.author) {
    throw new Error("No author data");
  }

  const { firstName, lastName, nickName, social } = data.author;

  const title = nickName
    ? `${firstName} "${nickName}" ${lastName}`
    : `${firstName} ${lastName}`;

  const socialLinks =
    social !== null
      ? Object.keys(social)
          .sort()
          .map((key) =>
            getSocialLink(key, social[key] as string | Record<string, string>)
          )
      : undefined;

  const socialBox = socialLinks ? (
    <div className="flex justify-around bg-[rgba(255,255,255,0.20)] backdrop-blur p-2 my-2 rounded-md">
      {socialLinks}
    </div>
  ) : undefined;

  const previews = (data.author.articles ? data.author.articles : [])
    .filter((article): article is BlogPostNode => article !== null)
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .map((article) => <ArticlePreview node={article} key={article.slug} />);

  return (
    <Layout pageTitle={title}>
      {socialBox}
      <MDXWrapper>{children}</MDXWrapper>
      {previews}
    </Layout>
  );
};

export const query = graphql`
  query AuthorInfoById($id: String) {
    author(id: { eq: $id }) {
      firstName
      lastName
      nickName
      social
      articles {
        ...PreviewData
      }
    }
  }
`;

export default AuthorPage;
