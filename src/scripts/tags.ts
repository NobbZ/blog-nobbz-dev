import { getCollection, CollectionEntry } from 'astro:content';

const allPosts = getCollection('post');

type Post = CollectionEntry<'post'>;

export type TagName = string;
export interface TagInfo {
	name: TagName;
	posts: Post[];
}

export type TagMap = Record<TagName, Post[]>;

export const getTagMap: () => Promise<TagMap> = async () => {
	return allPosts.then((posts) =>
		posts.reduce<TagMap>((tagMap, post) => {
			const tags: string[] = post.data.tags || [];

			return tags.reduce<TagMap>((tagMap, tag) => {
				const tags = tagMap[tag] || [];

				return {
					...tagMap,
					...{ [tag]: tags.concat([post]) },
				};
			}, tagMap);
		}, {})
	);
};

export const getTagList: () => Promise<TagInfo[]> = async () => {
	return getTagMap().then((tagMap) =>
		Object.entries(tagMap).map(([tag, posts]) => {
			return {
				name: tag,
				posts: posts.sort(
					(a, b) =>
						new Date(b.data.publishDate).valueOf() -
						new Date(a.data.publishDate).valueOf()
				),
			};
		})
	);
};

export const getTagCount: () => Promise<number> = async () =>
	getTagList().then((tagList) => tagList.length);

export const getMinMaxPostCount: () => Promise<number[]> = async () => {
	return getTagList().then((tagList) =>
		tagList.reduce(
			([minPostCount, maxPostCount], { posts }) =>
				posts.length > maxPostCount
					? [minPostCount, posts.length]
					: posts.length < minPostCount
					? [posts.length, maxPostCount]
					: [minPostCount, maxPostCount],
			[tagList[0].posts.length, tagList[0].posts.length]
		)
	);
};

export const getMinPostCount: () => Promise<number> = async () =>
	getMinMaxPostCount().then(([min, _]) => min);

export const getMaxPostCount: () => Promise<number> = async () =>
	getMinMaxPostCount().then(([_, max]) => max);
