import { MarkdownInstance } from "astro";

export type TagName = string;
export interface TagInfo {
    name: TagName;
    posts: Post[];
};

interface PostFrontmatter {
    title: string;
    description?: string;
    tags?: string[];
};

export type Post = MarkdownInstance<PostFrontmatter>;

export type TagMap = Record<TagName, Post[]>;

export const allPosts: Post[] = Object.values(
    import.meta.glob("/src/pages/posts/*.{mdx,astro}", { eager: true })
).map((p) => p as Post);

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