import { useArticles } from '../../../hooks/use-articles.hook'
import { MainArticle } from './MainArticle'

export function MainArticles() {
	const { articles } = useArticles()

	return (
		<main
			className='w-full min-h-[650px] grid
         mobile:grid-rows-4 mobile:grid-cols-1
         desktop:grid-rows-1 desktop:grid-cols-4
         gap-8'
		>
			<MainArticle article={articles[0]} />
			<MainArticle article={articles[1]} />
			<MainArticle article={articles[2]} />
			<MainArticle article={articles[3]} />
		</main>
	)
}
