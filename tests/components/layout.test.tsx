import * as React from "react";
import * as Gatsby from "gatsby";

import { render } from "@testing-library/react";
import { Layout } from "../../src/components";

const link = jest.spyOn(Gatsby, `Link`);
const useStaticQuery = jest.spyOn(Gatsby, `useStaticQuery`);
const mockUseStaticQuery = {
  site: {
    siteMetadata: {
      title: "My Site",
    },
  },
};

describe("Layout component", () => {
  beforeEach(() => {
    useStaticQuery.mockImplementation(() => mockUseStaticQuery);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    link.mockImplementation(({ to, children }) => <a href={to}>{children}</a>);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the site title", () => {
    const { getByText } = render(
      <Layout pageTitle="Test page">
        <p>Content</p>
      </Layout>
    );
    expect(getByText("My Site")).toBeInTheDocument();
  });

  it("renders the page title", () => {
    const { getByText } = render(
      <Layout pageTitle="Test page">
        <p>Content</p>
      </Layout>
    );
    expect(getByText("Test page")).toBeInTheDocument();
  });

  it("renders the content", () => {
    const { getByText } = render(
      <Layout pageTitle="Test page">
        <p>Content</p>
      </Layout>
    );
    expect(getByText("Content")).toBeInTheDocument();
  });

  it("renders the blog link", () => {
    const { getByText } = render(
      <Layout pageTitle="Test page">
        <p>Content</p>
      </Layout>
    );
    expect(getByText("Blog")).toBeInTheDocument();
  });

  const navLinks = {
    Blog: "/",
    Tags: "/tags",
    About: "/about",
  };

  for (const [name, path] of Object.entries(navLinks)) {
    it(`links the ${name} link to ${path}`, () => {
      const { getByRole } = render(
        <Layout pageTitle="Test page">
          <p>Content</p>
        </Layout>
      );

      const link = getByRole("link", { name });

      expect(link.getAttribute("href")).toBe(path);
    });
  }
});
