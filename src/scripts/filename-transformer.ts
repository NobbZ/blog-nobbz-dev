// SPDX-FileCopyrightText: 2025 Norbert Melzer
// SPDX-FileContributor: Norbert Melzer
//
// SPDX-License-Identifier: MIT

import type { ShikiTransformer } from "shiki";

export function filenameTransformer(): ShikiTransformer {
  const transformer: ShikiTransformer = {
    name: "filenameTransformer",

    pre(code) {
      const meta: string = this.options.meta?.__raw || "";
      const pattern = /(?:data-)?filename="(.*?)"/;

      const filename = pattern.exec(meta)?.[1] || null;

      if (filename) {
        code.properties.dataFilename = filename;

        code.properties.class +=
          " relative !pt-[2rem] before:content-[attr(data-filename)] before:absolute before:top-0 before:left-0 before:w-full before:bg-crust before:border-t-2 before:border-l-2 before:border-r-2 before:border-base before:border-solid before:font-bold before:px-4 before:py-1 before:whitespace-nowrap before:overflow-x-auto";
      }
    },
  };

  return transformer;
}
