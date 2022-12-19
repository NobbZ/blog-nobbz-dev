import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import { marked } from 'marked';

import { getCollection } from 'astro:content';

const site = import.meta.env.SITE;

export const get = async () => {
	const allPosts = await getCollection('post');

	return rss({
		title: "NobbZ' Blog",
		description: '',
		site,
		items: allPosts.map((post) => ({
			link: site + 'posts/' + post.slug,
			title: post.data.title,
			pubDate: post.data.publishDate,
			content: sanitizeHtml(marked(post.data.description ?? '')),
		})),
	});
};
