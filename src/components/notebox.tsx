import * as React from "react";

import { combineClasses } from "./mdxwrapper";

type NoteBoxProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
> & { className?: string };

export const NoteBox = ({
  children,
  className: classes,
  ...props
}: NoteBoxProps) => {
  const className = combineClasses(
    "max-w-[calc(var(--box-width)*95%)]",
    "md:relative",
    "md:left-[calc((var(--content-width)-(var(--box-width)*0.95))/2-theme(padding.2))]",
    "md:w-[calc(var(--box-width)*0.95)]",
    "bg-pen",
    "bg-box",
    "bg-[#f0f7fb]",
    "px-[calc(2.25em+theme(padding.2)*2)]",
    "py-[calc((2.25em+theme(padding.2)*2)/4)]",
    "bg-no-repeat",
    "shadow-xl",
    "my-5",
    "rounded-md",
    "border-solid",
    "border-blue-500",
    "border-2",
    classes
  );

  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};
