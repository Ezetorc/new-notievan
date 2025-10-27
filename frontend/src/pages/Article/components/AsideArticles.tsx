import { SecondaryArticle } from "../../../components/SecondaryArticle";
import { usePaginatedArticles } from "../../../hooks/use-paginated-articles.hook";

export function AsideArticles({ excludeId }: { excludeId: string }) {
  const { articles, loading } = usePaginatedArticles({
    type: "random",
    excludeId,
  });

  if (loading || !articles.length) {
    return (
      <aside className="flex flex-col gap-y-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <SecondaryArticle key={i} />
        ))}
      </aside>
    );
  }

  return (
    <aside className="flex flex-col gap-y-5">
      {articles.map((article) => (
        <SecondaryArticle key={article.id} article={article} />
      ))}
    </aside>
  );
}
