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
        posts,
    };
});

export const tagCount: number = tagList.length;

export const maxPostCount: number = tagList.reduce(
    (count, { posts }) => posts.length > count ? posts.length : count,
    0
)