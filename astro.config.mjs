// SPDX-FileCopyrightText: 2025 Norbert Melzer
// SPDX-FileContributor: Norbert Melzer
//
// SPDX-License-Identifier: MIT

import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import tailwindcss from "@tailwindcss/vite";

import { filenameTransformer } from "./src/scripts/filename-transformer";

const tailwindIntegration = tailwindcss({
  applyBaseStyles: false,
});

// https://astro.build/config
export default defineConfig({
  vite: { plugins: [tailwindIntegration] },
  integrations: [mdx()],
  legacy: { collections: true },
  markdown: {
    shikiConfig: {
      theme: "catppuccin-mocha",
      transformers: [filenameTransformer()],
    },
  },
});
