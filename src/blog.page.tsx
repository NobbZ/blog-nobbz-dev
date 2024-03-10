import Searcher from "lume/core/searcher.ts";
import { PaginateResult } from "lume/plugins/paginate.ts";

export const layout = "layouts/page.vto";
export const title = "Post Archive";

type Data = PaginateResult<Lume.Data>;

export default function* ({ search, paginate }: Lume.Data) {
  const posts: Lume.Data[] = search.pages("type=blog", "date=desc");

  for (const data of paginate(posts, { url, size: 5 })) {
    data.content = renderPage(data);

    // console.log("blog pagination data", data);

    yield data;
  }
}

function url(n: number) {
  return n === 1 ? "/blog/" : `/blog/${n}`;
}

function renderPage(data: PaginateResult<Lume.Data>) {
  const cards = data.results.map(buildCard);

  return (
    <>
      {cards}
      <div class="flex">
        <a
          class="flex-auto text-center rounded-[8px] border-2 mb-1 h-16 w-8"
          href={data.pagination.previous ?? ""}
        >
          &lt;
        </a>
        <div class="flex-auto flex-col">
          <div class="text-center rounded-[8px] border-2 h-8 w-1/1">
            {data.pagination.page}/{data.pagination.totalPages}
          </div>
          <div class="text-center rounded-[8px] border-2 h-8 w-1/1">
            Displaying {data.results.length} out of{" "}
            {data.pagination.totalResults} posts
          </div>
        </div>
        <a
          class="flex-auto text-center rounded-[8px] border-2 mb-1 h-16 w-8"
          href={data.pagination.next ?? ""}
        >
          &gt;
        </a>
      </div>
    </>
  );
}

function buildCard({ search, author, url, ...page }: Lume.Data) {
  const date: string = page.date.toISOString().split("T")[0];

  const authorLink = getAuthorLink(search, author);

  return (
    <article class="min-h-[100px] block rounded-[8px] border-2 mb-1 shadow shadow-[var(--highligh-color)] hover:shadow-md hover:shadow-[var(--highligh-color)]">
      <h1>
        <a href={url}>{page.title}</a>
      </h1>
      <p class="text-sm">
        Written by {authorLink} on {page.date.toISOString().split("T")[0]}
      </p>
      <p class="text-sm">{page.description}</p>
    </article>
  );
}

function getAuthorLink(search: Searcher, author: string) {
  const authorPage: Lume.Data | undefined = search.pages<Lume.Data>(
    `type=author url$=${author}/`,
    "name"
  )[0];
  const authorName: string = authorPage?.name ?? `"${author}"`;
  const authorUrl: string | undefined = authorPage?.url;
  return authorUrl ? <a href={authorUrl}>{authorName}</a> : <>authorName</>;
}
