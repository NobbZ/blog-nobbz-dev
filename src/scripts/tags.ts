import { Post, allPosts } from "./posts";

export type TagName = string;
export interface TagInfo {
    name: TagName;
    posts: Post[];
};

export type TagMap = Record<TagName, Post[]>;

export const tagMap: TagMap = allPosts.reduce<TagMap>((tagMap, post) => {
    const tags: string[] = post.frontmatter.tags || [];

    return tags.reduce<TagMap>((tagMap, tag) => {
        const tags = tagMap[tag] || [];

        return {
            ...tagMap,
            ...{ [tag]: tags.concat([post]) },
        };
    }, tagMap);
}, {});

export const tagList: TagInfo[] = Object.entries(tagMap).map(([tag, posts]) => {
    return {
        name: tag,
        posts: posts.sort((a, b) => new Date(b.frontmatter.publishDate).valueOf() - new Date(a.frontmatter.publishDate).valueOf()),
    };
});

export const tagCount: number = tagList.length;

export const [minPostCount, maxPostCount]: number[] = tagList.reduce(
    ([minPostCount, maxPostCount], { posts }) => posts.length > maxPostCount ? [minPostCount, posts.length] : posts.length < minPostCount ? [posts.length, maxPostCount] : [minPostCount, maxPostCount],
    [tagList[0].posts.length, tagList[0].posts.length]
)
