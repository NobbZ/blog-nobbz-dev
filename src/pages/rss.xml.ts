import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import { marked } from 'marked';

import { allPosts } from '@nz-scripts/posts';

export const get = () =>
	rss({
		title: "NobbZ' Blog",
		description: '',
		site: import.meta.env.SITE,
		items: allPosts.map((post) => ({
			link: post.url,
			title: post.frontmatter.title,
			pubDate: new Date(post.frontmatter.publishDate),
			content: sanitizeHtml(marked(post.frontmatter.description)),
		})),
	});
