// TODO: remove `{className?: string}` from all components when https://github.com/jsx-eslint/eslint-plugin-react/issues/3284 got fixed

import * as React from "react";
import { MDXProvider } from "@mdx-js/react";
import type { Components, Props as MDXProviderProps } from "@mdx-js/react/lib";

import { Pre } from "~components/pre";

type MDXWrapperProps = Omit<MDXProviderProps, "components">;

// TODO: move into proper module
export const combineClasses = (...classes: (string | undefined)[]) => {
  const classNamesList = classes.filter(
    (e: string | undefined): e is string => e !== undefined
  );

  return classNamesList.length > 0 ? classNamesList.join(" ") : undefined;
};

const P = (
  props: React.HTMLAttributes<HTMLParagraphElement> & { className?: string }
) => {
  const { className: classes, ...newProps } = props;
  const className = combineClasses("lg:m-1.5", "m-1", classes);

  return <p className={className} {...newProps} />;
};

const H2 = ({
  className: classes,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { className?: string }) => {
  const className = combineClasses(
    "w-full",
    "font-bold",
    "mt-5",
    "text-xl",
    "text-center",
    "md:relative",
    "md:left-[calc((var(--content-width)-var(--box-width))/2-theme(padding.2))]",
    // md:left-[calc((var(--content-width)-var(--box-width))/2)]
    "md:w-[--box-width]",
    "md:text-3xl",
    classes
  );

  return (
    <h2 className={className} {...props}>
      {children}
    </h2>
  );
};

const Code = (
  props: React.HTMLAttributes<HTMLElement> & { className?: string }
) => {
  const { className: classes, ...newProps } = props;
  const className = combineClasses(
    "bg-[rgb(220,220,220)]",
    "p-0.5",
    "rounded-md",
    classes
  );

  return <code className={className} {...newProps} />;
};

const A = ({
  className: classes,
  children,
  ...props
}: React.HTMLAttributes<HTMLAnchorElement> & { className?: string }) => {
  const className = combineClasses("underline", "text-blue-700", classes);

  return (
    <a className={className} {...props}>
      {children}
    </a>
  );
};

const BlockQuote = (
  props: React.HTMLAttributes<HTMLElement> & { className?: string }
) => {
  const { className: classes, ...newProps } = props;

  const className = combineClasses(
    "max-w-[calc(var(--box-width)*95%)]",
    "md:relative",
    "md:left-[calc((var(--content-width)-(var(--box-width)*0.95))/2-theme(padding.2))]",
    "md:w-[calc(var(--box-width)*0.95)]",
    "bg-quote",
    "bg-box",
    "bg-[#f0f7fb]",
    "px-[calc(2.25em+theme(padding.2)*2)]",
    "py-[calc((2.25em+theme(padding.2)*2)/4)]",
    "bg-no-repeat",
    "shadow-xl",
    "my-5",
    "rounded-md",
    classes
  );

  return <blockquote className={className} {...newProps} />;
};

const Ol = (
  props: React.HTMLAttributes<HTMLElement> & { className?: string }
) => {
  const { className: classes, ...newProps } = props;
  const className = combineClasses("list-decimal", "ps-10", classes); // TODO: add more classes

  return <ol className={className} {...newProps} />;
};

const Ul = (
  props: React.HTMLAttributes<HTMLElement> & { className?: string }
) => {
  const { className: classes, ...newProps } = props;
  const className = combineClasses("list-decimal", "ps-10", classes); // TODO: add more classes

  return <ul className={className} {...newProps} />;
};

const Li = (
  props: React.HTMLAttributes<HTMLElement> & { className?: string }
) => {
  const { className: classes, ...newProps } = props;
  const className = combineClasses(classes); // TODO: add more classes

  return <li className={className} {...newProps} />;
};

const Em = (
  props: React.HTMLAttributes<HTMLElement> & { className?: string }
) => {
  const { className: classes, ...newProps } = props;
  const className = combineClasses(classes); // TODO: add more classes

  return <em className={className} {...newProps} />;
};

const dontUse = (name: string) => {
  return () => {
    throw new Error(`dont use ${name}`);
  };
};

const implement = (name: string) => {
  return () => {
    throw new Error(`implement ${name}`);
  };
};

const components: Components = {
  p: P,
  h1: dontUse("h1"),
  h2: H2,
  h3: implement("h3"),
  h4: implement("h4"),
  h5: implement("h5"),
  h6: implement("h6"),
  thematicBreak: implement("thematicBreak"),
  blockquote: BlockQuote,
  ul: Ul,
  ol: Ol,
  li: Li,
  table: implement("table"),
  tr: implement("tr"),
  td: implement("td"),
  th: implement("th"),
  pre: Pre,
  em: Em,
  strong: implement("strong"),
  delete: implement("delete"),
  code: Code,
  inlineCode: implement("inlineCode"),
  hr: implement("hr"),
  a: A,
  img: implement("img"),
};

export const MDXWrapper = (props: MDXWrapperProps) => {
  const { children, ...newProps } = props;

  return (
    <MDXProvider components={components} {...newProps}>
      {children}
    </MDXProvider>
  );
};
