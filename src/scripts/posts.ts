import { MarkdownInstance } from 'astro';

export interface Author {
	name: string;
}

export interface PostFrontmatter {
	title: string;
	publishDate: string;
	author: Author;
	description?: string;
	tags?: string[];
}

export type Post = MarkdownInstance<PostFrontmatter>;

export const allPosts: Post[] = Object.values(
	import.meta.glob('/src/pages/posts/*.{mdx,astro}', { eager: true })
).map((p) => p as Post);
