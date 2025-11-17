import { Article } from '../../../components/Article'
import { useArticles } from '../../../hooks/use-articles.hook'

export function MainArticles() {
  const { articles } = useArticles({ limit: 4 })

  return (
    <main className='w-full grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-4'
    >
      {articles.map(article => <Article key={article.id} article={article} />)}
    </main>
  )
}
