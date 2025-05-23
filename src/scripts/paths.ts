// SPDX-FileCopyrightText: 2025 Norbert Melzer
// SPDX-FileContributor: Norbert Melzer
//
// SPDX-License-Identifier: MIT

import type { CollectionEntry } from "astro:content";

import { DateTime } from "luxon";

export const postPath = (post: CollectionEntry<"blog">): string => {
  const date = DateTime.fromJSDate(post.data.date).toFormat("yyyy-MM-dd");
  const slug = post.slug;

  return `/blog/${date}-${slug}`;
};

export const authorPath = (author: CollectionEntry<"authors">): string => {
  const slug = author.slug;

  return `/authors/${slug}`;
};
