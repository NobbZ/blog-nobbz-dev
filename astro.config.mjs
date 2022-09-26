import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import path from 'path';

import tailwind from '@astrojs/tailwind';

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
	integrations: [mdx(), tailwind(tailwindConfig)],
	vite: {
		ssr: { external },
		resolve: { alias },
	},
});
