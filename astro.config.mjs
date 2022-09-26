import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import robotsTxt from 'astro-robots-txt';

import path from 'path';

import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

const tailwindConfig = { config: { applyBaseStyles: false } };

const mkPath = (name) => path.resolve(`./src/${name}`);

const alias = {
	'@nz-components': mkPath('components'),
	'@nz-layouts': mkPath('layouts'),
	'@nz-pages': mkPath('pages'),
	'@nz-scripts': mkPath('scripts'),
	'@nz-styles': mkPath('styles'),
};

const external = ['svgo'];

// https://astro.build/config
export default defineConfig({
	integrations: [sitemap(), mdx(), tailwind(tailwindConfig), robotsTxt()],
	site: 'https://blog.nobbz.dev',
	vite: {
		ssr: { external },
		resolve: { alias },
	},
});
