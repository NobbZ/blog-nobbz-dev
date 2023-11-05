import * as React from "react";
import * as R from "ramda";
import { Highlight, Prism } from "prism-react-renderer";
import { combineClasses } from "./mdxwrapper";

(typeof global !== "undefined" ? global : window).Prism = Prism;

require("prismjs/components/prism-elixir");
require("prismjs/components/prism-erlang");
require("prismjs/components/prism-nix");

interface ChildFunProps {
  className: string;
  style: React.CSSProperties;
  tokens: Token[][];
  getLineProps: CallableFunction; // TODO: properly type this
  getTokenProps: CallableFunction; // TODO: properly type this
}

interface Token {
  types: string[];
  content: string;
  empty?: boolean;
}

type PreProps = React.HTMLAttributes<HTMLPreElement>;

const childFun = ({
  className: langClass,
  style: passedStyle,
  tokens,
  getLineProps,
  getTokenProps,
}: ChildFunProps) => {
  const style: React.CSSProperties = R.mergeLeft(
    { overflow: "auto" },
    passedStyle
  );

  const className: string =
    combineClasses(
      "w-full",
      "md:relative",
      "md:left-[calc((var(--content-width)-(var(--box-width)*0.95))/2-theme(padding.2))]",
      "md:w-[calc(var(--box-width)*0.95)]",
      "p-2",
      "my-4",
      "overflow-auto",
      "rounded-md",
      langClass
    ) || "";

  return (
    <pre className={className} style={style}>
      {tokens.map((line: Token[], i: number) =>
        line.length === 1 && line[0].empty === true ? null : (
          // TODO: Remove this ignore
          // eslint-disable-next-line react/jsx-key
          <div {...getLineProps({ line, key: i })}>
            {line.map((token: Token, key: number) => {
              // TODO: Remove this ignore
              // eslint-disable-next-line react/jsx-key
              return <span {...getTokenProps({ token, key })} />;
            })}
          </div>
        )
      )}
    </pre>
  );
};

export const Pre = ({ children }: PreProps) => {
  const childProps =
    typeof children === "object" && children !== null && "props" in children
      ? children.props
      : {};

  const className: string = childProps.className || "";
  const matches: RegExpMatchArray | null =
    className.match(/language-(?<lang>.*)/);

  const language: string = matches?.groups?.lang || "";

  return (
    <Highlight code={childProps.children} language={language}>
      {childFun}
    </Highlight>
  );
};
