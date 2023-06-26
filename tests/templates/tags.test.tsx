import * as React from "react";
import { render } from "@testing-library/react";
import { Tag } from "../../src/templates/tags";

const colors = {
  test: {
    border: "#9f86d0",
    background: "#9f86d080",
  },
  other: {
    border: "#d9298a",
    background: "#d9298a80",
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

    it("shows the tag icon", () => {
      const { container } = render(<Tag name={name} key={name} />, {});
      const icon = container.querySelector("iconify-icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveStyle({ color: color.border });
    });
  }
});
