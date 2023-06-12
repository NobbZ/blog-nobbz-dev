import * as React from "react";
import * as R from "ramda";
import { Highlight, Prism } from "prism-react-renderer";

(typeof global !== "undefined" ? global : window).Prism = Prism;

require("prismjs/components/prism-elixir");
require("prismjs/components/prism-erlang");
require("prismjs/components/prism-nix");

type ChildFunProps = {
  className: string;
  style: React.CSSProperties;
  tokens: Token[][];
  getLineProps: CallableFunction; // TODO: properly type this
  getTokenProps: CallableFunction; // TODO: properly type this
};

type Token = {
  types: string[];
  content: string;
  empty?: boolean;
};

type PreProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
>;

const childFun = ({
  className,
  style: passedStyle,
  tokens,
  getLineProps,
  getTokenProps,
}: ChildFunProps) => {
  const style: React.CSSProperties = R.mergeLeft(
    { overflow: "auto" },
    passedStyle
  );

  return (
    <pre className={className} style={style}>
      {tokens.map((line: Token[], i: number) =>
        line.length === 1 && line[0].empty === true ? null : (
          <div {...getLineProps({ line, key: i })}>
            {line.map((token: Token, key: number) => {
              return <span {...getTokenProps({ token, key })} />;
            })}
          </div>
        )
      )}
    </pre>
  );
};

const Pre = (props: PreProps): React.ReactElement => {
  const children = props.children;
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

export default Pre;
