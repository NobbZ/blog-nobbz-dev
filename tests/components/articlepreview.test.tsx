import * as React from "react";

import { render } from "@testing-library/react";
import { ArticlePreview as Preview } from "../../src/components";

describe("Preview component", () => {
  const node = {
    date: "2020-01-01",
    excerpt: "This is a test excerpt",
    heroImage: { alt: "Test image" },
    slug: "test-post",
    tags: ["test-tag"],
    title: "Test Post",
  };

  it("renders the post title", () => {
    const { getByText } = render(<Preview node={node} />);
    expect(getByText("Test Post")).toBeInTheDocument();
  });

  it("links the post title to the post page", () => {
    const { getByRole } = render(<Preview node={node} />);

    expect(
      getByRole("link", { name: "Test Post" }).getAttribute("href")
    ).toMatch(new RegExp("/2020-01-01-test-post/?$"));
  });

  it("shows the publish date", () => {
    const { getByText } = render(<Preview node={node} />);
    expect(getByText("Posted: 2020-01-01")).toBeInTheDocument();
  });

  it("shows the post excerpt", () => {
    const { getByText } = render(<Preview node={node} />);
    expect(getByText("This is a test excerpt")).toBeInTheDocument();
  });

  it("shows the tag list", () => {
    const { getByRole } = render(<Preview node={node} />);
    expect(getByRole("link", { name: "test-tag" })).toBeInTheDocument();
  });

  it("links the tag to the tag page", () => {
    const { getByRole } = render(<Preview node={node} />);
    expect(
      getByRole("link", { name: "test-tag" }).getAttribute("href")
    ).toMatch(new RegExp("/tags/test-tag/?$"));
  });
});
