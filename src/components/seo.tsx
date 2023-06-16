import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";

interface SeoProps {
  title: string;
}

export const Seo = ({ title }: SeoProps) => {
  const data: Queries.SiteTitleQuery = useStaticQuery(graphql`
    query SiteTitle {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  if (!data.site) {
    throw new Error("No site data");
  }

  // TODO: for some reason, the `site` is still nullable, this needs to be fixed
  // at the generated types, but for some reason, the changes at the top level are
  // not reflected in the generated types
  return (
    <title>
      {title} | {data.site.siteMetadata.title}
    </title>
  );
};
