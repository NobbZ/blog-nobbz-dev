import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

type LayoutProps = React.PropsWithChildren<{
  pageTitle: string | React.ReactNode;
  className?: string | string[];
}>;

export const Layout = ({ pageTitle, children }: LayoutProps) => {
  const data = useStaticQuery(graphql`
    query FetchTitle {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div className="w-100% max-w-[var(--content-width)] md:w-[var(--content-width)] m-auto">
      <header className="text-center text-4xl">
        {data.site.siteMetadata.title}
      </header>
      <nav>
        <ul className="flex flex-row justify-between p-2 md:w-[var(--content-width)]">
          <li>
            <Link to="/">Blog</Link>
          </li>
          <li>
            <Link to="/tags">Tags</Link>
          </li>
          <li>
            <Link to="/author/nobbz">About</Link>
          </li>
        </ul>
      </nav>
      <main className="max-w-[var(--content-width)] md:w-[var(--content-width)]">
        <h1 className="text-3xl text-center">{pageTitle}</h1>
        {children}
      </main>
    </div>
  );
};
