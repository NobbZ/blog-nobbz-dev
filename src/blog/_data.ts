import { format } from "lume/deps/date.ts";

export const url = (page: Lume.Data) => {
  const date: string = format(page.data.date, "yyyy-MM-dd");
  const url = `/blog/${date}-${page.data.slug}/`;

  if (!page.data.slug) {
    throw new Error(`Post must have a slug: ${page.src.entry.src}`);
  }

  return url;
};
