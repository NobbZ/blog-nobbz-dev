// SPDX-FileCopyrightText: 2025 Norbert Melzer
// SPDX-FileContributor: Norbert Melzer
//
// SPDX-License-Identifier: MIT

import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import tailwind from "@astrojs/tailwind";

import { filenameTransformer } from "./src/scripts/filename-transformer";

const tailwindIntegration = tailwind({
  applyBaseStyles: false,
});

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), tailwindIntegration],
  legacy: { collections: true },
  markdown: {
    shikiConfig: {
      theme: "catppuccin-mocha",
      transformers: [filenameTransformer()],
    },
  },
});
