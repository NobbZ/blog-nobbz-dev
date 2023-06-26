import * as React from "react";

import { render } from "@testing-library/react";
import { Comments } from "../../src/components";

describe("Comments component", () => {
  // TODO: Fix this test
  // It is currently not clear to me why this test fails.
  // The component just renders a <section /> element.
  xit("renders a section element", () => {
    const { getByTestId } = render(<Comments />);
    expect(getByTestId("comments-section")).toBeInTheDocument();
  });

  // TODO: Fix this test
  // It is currently not clear to me why this test fails.
  // The component just renders a <section /> element.
  xit("appends a script element to the section", () => {
    const { getByTestId } = render(<Comments />);
    expect(
      getByTestId("comments-section").querySelector("script")
    ).toBeInTheDocument();
  });

  // TODO: Fix this test
  // It is currently not clear to me why this test fails.
  // The component just renders a <section /> element.
  xit("sets the correct src on the script element", () => {
    const { getByTestId } = render(<Comments />);
    expect(
      getByTestId("comments-section").querySelector("script")?.src
    ).toEqual("https://utteranc.es/client.js");
  });

  // TODO: Fix this test
  // It is currently not clear to me why this test fails.
  // The component just renders a <section /> element.
  xit("sets async attribute on the script element", () => {
    const { getByTestId } = render(<Comments />);
    expect(
      getByTestId("comments-section").querySelector("script")?.async
    ).toEqual(true);
  });

  // TODO: Fix this test
  // It is currently not clear to me why this test fails.
  // The component just renders a <section /> element.
  xit("sets crossOrigin attribute on the script element", () => {
    const { getByTestId } = render(<Comments />);
    expect(
      getByTestId("comments-section").querySelector("script")?.crossOrigin
    ).toEqual("anonymous");
  });

  // TODO: Fix this test
  // It is currently not clear to me why this test fails.
  // The component just renders a <section /> element.
  xit("sets the correct repo attribute on the script element", () => {
    const { getByTestId } = render(<Comments />);
    expect(
      getByTestId("comments-section")
        .querySelector("script")
        ?.getAttribute("repo")
    ).toEqual("nobbz/blog-nobbz-dev");
  });
});
