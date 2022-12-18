import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import { marked } from 'marked';

import { getCollection } from 'astro:content';

const allPosts = await getCollection('post');

const site = import.meta.env.SITE;

export const get = () =>
	rss({
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
