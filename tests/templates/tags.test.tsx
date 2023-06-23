import * as React from "react";
import { render } from "@testing-library/react";
import { Tag } from "../../src/templates/tags";

const colors = {
  test: {
    border: "#9f86d0",
    background: "rgba(159, 134, 208, 0.502)",
  },
  other: {
    border: "#d9298a",
    background: "rgba(217, 41, 138, 0.502)",
  },
};

describe("Tag component", () => {
  for (const [name, color] of Object.entries(colors)) {
    it(`renders the tag name ${name}`, () => {
      const { getByText } = render(<Tag name={name} key={name} />);
      expect(getByText(name)).toBeInTheDocument();
    });

    it(`generates a color based on the tag name ${name}`, () => {
      const { container } = render(<Tag name={name} key={name} />);
      expect(container.children[0]).toHaveStyle({
        backgroundColor: color.background,
        borderColor: color.border,
      });
    });

    it("links to the tag page", () => {
      const { getByText } = render(<Tag name={name} key={name} />);
      const link = getByText(name).closest("a");
      const re = new RegExp(`/tags/${name}/?$`);
      expect(link?.href).toMatch(re);
    });

    // TODO: Fix this test
    // It is currently not clear to me why this test fails.
    // the <Icon /> component is not rendered in the test.
    // Instead the <Icon /> component is rendered as a <span />.
    // This is not the case when the component is rendered in the browser.
    xit("shows the tag icon", () => {
      const { container, getByTestId } = render(
        <Tag name={name} key={name} />,
        { hydrate: true }
      );
      console.log("container", container.innerHTML);
      expect(getByTestId("iconify-mdi-tag")).toBeInTheDocument();
      expect(getByTestId("iconify-mdi-tag")).toHaveStyle({ color: "#aabb" });
    });
  }
});
