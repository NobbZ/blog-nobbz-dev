// SPDX-FileCopyrightText: 2025 Norbert Melzer
// SPDX-FileContributor: Norbert Melzer
//
// SPDX-License-Identifier: MIT

import type { ShikiTransformer } from "shiki";
import type { Element } from "hast";

export function filenameTransformer(): ShikiTransformer {
  const transformer: ShikiTransformer = {
    name: "filenameTransformer",

    pre(code: Element) {
      const meta: string = this.options?.meta?.__raw || "";
      const pattern = /(?:data-)?filename="(.*?)"/;

      const filename = pattern.exec(meta)?.[1] || null;

      if (filename) {
        code.properties.dataFilename = filename;

        const titlebar_class = [
          "relative",
          "!pt-[2.5rem]",
          "before:content-[attr(data-filename)]",
          "before:absolute",
          "before:top-0",
          "before:left-0",
          "before:w-full",
          "before:bg-gradient-to-b",
          "before:from-ctp-crust",
          "before:to-ctp-base",
          "before:rounded-t",
          "before:border-t-2",
          "before:border-l-2",
          "before:border-r-2",
          "before:border-ctp-base",
          "before:border-solid",
          "before:font-bold",
          "before:px-4",
          "before:py-1",
          "before:whitespace-nowrap",
          "before:overflow-x-auto",
        ].join(" ");

        code.properties.class =
          (code.properties.class ?? false)
            ? code.properties.class + " " + titlebar_class
            : titlebar_class;
      }
    },
  };

  return transformer;
}
