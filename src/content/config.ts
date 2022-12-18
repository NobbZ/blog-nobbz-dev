import { z, defineCollection } from 'astro:content';

const post = defineCollection({
	schema: {
		title: z.string(),
		publishDate: z.date(),
		author: z.object({ name: z.string() }).optional(),
		description: z.string().optional(),
		tags: z.array(z.string()).optional(),
	},
});

export const collections = {
	post,
};
