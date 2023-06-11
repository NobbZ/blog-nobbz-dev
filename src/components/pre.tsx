import * as React from "react";
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
  style,
  tokens,
  getLineProps,
  getTokenProps,
}: ChildFunProps) => {
  // TODO: get this work via CSS
  const width = 700;
  const padding = 10;
  const left = (600 - width) / 2 - padding;
  const radius = padding * 1.5;

  const boxShadow =
    "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px";

  return (
    <pre
      className={className}
      style={{
        padding: `${padding}px`,
        width: `${width}px`,
        position: "relative",
        left: `${left}px`,
        borderRadius: `${radius}px`,
        boxShadow: `${boxShadow}`,
        ...style,
      }}
    >
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
