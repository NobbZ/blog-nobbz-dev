// SPDX-FileCopyrightText: 2025 Norbert Melzer
// SPDX-FileContributor: Norbert Melzer
//
// SPDX-License-Identifier: MIT

import { z } from "zod";
import { reference } from "astro:content";

export const schema = z.object({
  title: z.string(),
  tags: z.array(z.string()),
  date: z.date(),
  description: z.string(),
  author: reference("authors"),
});
