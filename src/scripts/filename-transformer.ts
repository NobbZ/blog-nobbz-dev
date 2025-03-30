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
      }
    },
  };

  return transformer;
}
