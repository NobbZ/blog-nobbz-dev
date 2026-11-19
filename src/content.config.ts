// SPDX-FileCopyrightText: 2025 Norbert Melzer
// SPDX-FileContributor: Norbert Melzer
//
// SPDX-License-Identifier: MIT

import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

import { schema as authorsSchema } from "./content/schemas/authors";
import { schema as blogSchema } from "./content/schemas/blog";

export const collections = {
  authors: defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/authors" }),
    schema: authorsSchema,
  }),
  blog: defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
    schema: blogSchema,
  }),
};
