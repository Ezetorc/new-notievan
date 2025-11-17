import { Article } from '../../../components/Article'
import { usePaginatedArticles } from '../../../hooks/use-paginated-articles.hook'

export function AsideArticles({ excludeId }: { excludeId: string }) {
	const { articles, loading } = usePaginatedArticles({
		type: 'random',
		excludeId,
		limit: 2
	})

	if (loading || !articles.length) {
		return (
			<aside className='flex flex-col gap-y-5'>
				<Article />
				<Article />
			</aside>
		)
	}

	return (
		<aside className='flex flex-col gap-y-5'>
			{articles.map((article) => (
				<Article key={article.id} article={article} />
			))}
		</aside>
	)
}
