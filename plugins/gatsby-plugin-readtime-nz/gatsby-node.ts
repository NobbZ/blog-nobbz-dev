import { GatsbyNode } from "gatsby";
import type { PluginOptions } from "gatsby";

import type { IMdxNode } from "gatsby-plugin-mdx/dist/types";

import { readingTime } from "reading-time-estimator";
import type { SupportedLanguages } from "reading-time-estimator/dist/types/i18n/supportedLanguages";

interface Options extends PluginOptions {
  wordsPerMinute?: number;
  language?: SupportedLanguages;
}

export const shouldOnCreateNode: GatsbyNode<IMdxNode>["shouldOnCreateNode"] = (
  { node },
  options: Options
) => node.internal.type === "Mdx" && node.body !== undefined;

export const onCreateNode: GatsbyNode<IMdxNode>["onCreateNode"] = (
  { node, actions },
  options: Options
) => {
  const { createNodeField } = actions;

  const { wordsPerMinute = 200, language = "en" } = options;

  createNodeField({
    node,
    name: "readingTime",
    value: readingTime(node.body as string, wordsPerMinute, language),
  });
};
