import { Article } from '../../../components/Article'
import { LoadMoreButton } from '../../../components/LoadMoreButton'
import { usePaginatedArticles } from '../../../hooks/use-paginated-articles.hook'

export function AccountArticles() {
	const { articles, hasMore, loadMore, loading } = usePaginatedArticles({
		type: 'own'
	})

	if (articles.length === 0) return null

	return (
		<section className='my-9'>
			<main className='grid grid-cols-1 gap-8 desktop:grid-cols-4'>
				{articles.map((article) => (
					<Article key={article.id} article={article} />
				))}
			</main>

			{hasMore && (
				<LoadMoreButton loading={loading} onClick={loadMore}>
					Ver más
				</LoadMoreButton>
			)}
		</section>
	)
}
