import { defineConfig } from 'vite';

const cacheDir = process.env.VITE_CACHE ? process.env.VITE_CACHE : 'node_modules/.vite';

export default defineConfig({ cacheDir });
