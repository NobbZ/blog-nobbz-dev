import { z, defineCollection } from 'astro:content';
import { format } from 'util';

type Optional<T> = T | undefined;

const post = defineCollection({
	schema: {
		title: z.string(),
		publishDate: z.date(),
		author: z.string(),
		description: z.string().optional(),
		tags: z.array(z.string()).optional(),
	},
});

function lookup(social: Optional<string> | undefined, dflt: string): Optional<string> | undefined {
	switch (social) {
		case undefined:
			return dflt;

		case 'none':
			return undefined;

		default:
			return social;
	}
}

function getURL(template: string, id: Optional<string>): Optional<string> {
	return id !== undefined ? format(template, id) : undefined;
}

const socialTransform = ({ nick, ...social }) => {
	const github = lookup(social.github, nick);
	const gitlab = lookup(social.gitlab, nick);
	const twitter = lookup(social.twitter, nick);

	return {
		nick,
		github,
		gitlab,
		twitter,
		githubUrl: getURL('https://github.com/%s', github),
		gitlabUrl: getURL('https://gitlab.com/%s', gitlab),
		twitterUrl: getURL('https://twitter.com/%s', twitter),
	};
};

const social = z
	.object({
		nick: z.string(),
		github: z.string().optional(),
		gitlab: z.string().optional(),
		twitter: z.string().optional(),
	})
	.transform(socialTransform);

const author = defineCollection({
	schema: {
		name: z.string(),
		href: z.string().url(),
		wishlist: z.record(z.string().url()).optional(),
		social,
	},
});

export const collections = {
	author,
	post,
};
