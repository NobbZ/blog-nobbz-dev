import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import {
  container,
  heading,
  navLinks,
  navLinkItem,
  navLinkText,
  siteTitle,
} from "./layout.module.css";

type LayoutProps = React.PropsWithChildren<{
  pageTitle: string;
  className?: string | string[];
}>;

const Layout = ({ className, pageTitle, children }: LayoutProps) => {
  const data = useStaticQuery(graphql`
    query FetchTitle {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const normalizeClassName = Array.isArray(className)
    ? className
    : className !== undefined
    ? [className]
    : [];

  const joinedClassName = (otherNames?: string | string[]) => {
    const normalizedOtherNames = Array.isArray(otherNames)
      ? otherNames
      : otherNames !== undefined
      ? [otherNames]
      : [];

    return [...normalizeClassName, ...normalizedOtherNames].join(" ");
  };

  return (
    <div className={joinedClassName(container)}>
      <header className={siteTitle}>{data.site.siteMetadata.title}</header>
      <nav>
        <ul className={navLinks}>
          <li className={navLinkItem}>
            <Link to="/" className={navLinkText}>
              Index
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/about" className={navLinkText}>
              About
            </Link>
          </li>
        </ul>
      </nav>
      <main className="text-justify">
        <h1 className={heading}>{pageTitle}</h1>
        {children}
      </main>
    </div>
  );
};

export default Layout;
