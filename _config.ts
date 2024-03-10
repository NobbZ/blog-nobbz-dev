import lume from "lume/mod.ts";

/* Import plugins */
import attributes from "lume/plugins/attributes.ts";
import base_path from "lume/plugins/base_path.ts";
import code_highlight from "lume/plugins/code_highlight.ts";
import feed from "lume/plugins/feed.ts";
import jsx from "lume/plugins/jsx_preact.ts";
import mdx from "lume/plugins/mdx.ts";
import metas from "lume/plugins/metas.ts";
import postcss from "lume/plugins/postcss.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";

/* Set basic configuration */
const site = lume({
  src: "src",
  server: { port: 10123 },
});

/* Load and configure plugins */
site.use(attributes());
site.use(base_path());
site.use(code_highlight());
site.use(feed());
site.use(jsx());
site.use(mdx());
site.use(metas());
site.use(tailwindcss());

// needs to be added *after* tailwindcss
site.use(postcss());

export default site;
