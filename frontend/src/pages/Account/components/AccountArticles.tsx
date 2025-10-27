import { SecondaryArticle } from "../../../components/SecondaryArticle";
import { usePaginatedArticles } from "../../../hooks/use-paginated-articles.hook";

export function AccountArticles() {
  const { articles, hasMore, loadMore } = usePaginatedArticles({ type: "own" });

  if (articles.length === 0) return null;

  return (
    <section className="my-9">
      <main className="grid grid-cols-1 gap-8 desktop:grid-cols-4">
        {articles.map((article) => (
          <SecondaryArticle key={article.id} article={article} />
        ))}
      </main>

      {hasMore && (
        <button
          className="w-full mt-6 py-5 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={loadMore}
        >
          Cargar más
        </button>
      )}
    </section>
  );
}
