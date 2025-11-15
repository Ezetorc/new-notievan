import { Hero } from '../../../components/Hero'
import { MainArticles } from './MainArticles'
import { SecondaryArticles } from './SecondaryArticles'

export default function HomePage() {
  return (
    <>
      <Hero
        title='NotiEvan'
        description='Descubrí lo que está pasando en el Evan'
      />

      <MainArticles />
      <SecondaryArticles />
    </>
  )
}
