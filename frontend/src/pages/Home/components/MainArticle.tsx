import { useAuthorName } from "../../../hooks/use-author-name.hook";
import type { Article as ArticleData } from "../../../../../backend/prisma/generated/prisma";
import { Article } from "../../../components/Article";

interface Props {
  article?: ArticleData;
}

export function MainArticle({ article }: Props) {
  const authorName = useAuthorName(article?.authorId);

  if (!article) {
    return (
      <article className="animate-pulse flex flex-col gap-y-4 w-full">
        <div className="min-h-[100px] mobile:max-h-[200px] desktop:max-h-[400px] h-full aspect-[9/16] bg-gray-300 w-full object-cover"></div>
        <div className="flex flex-col gap-y-2 w-full">
          <div className="rounded-[8px] h-6 w-[80%] bg-gray-300" />
          <div className="rounded-[8px] h-8 w-[90%] bg-gray-300" />
          <div className="rounded-[8px] h-12 bg-gray-300" />
          <div className="rounded-[8px] h-4 w-[50%] bg-gray-300" />
        </div>
      </article>
    );
  }

  return (
    <Article id={article.id} className="flex flex-col gap-y-4 w-full">
      <img
        loading="eager"
        src={article.image}
        alt={article.title}
        className="min-h-[100px] mobile:max-h-[200px] desktop:max-h-[400px] h-full aspect-[9/16] bg-gray-200 w-full object-cover"
      />
      <div className="flex flex-col gap-y-2 w-full">
        <h4 className="text-brand-red text-3xl break-words">
          {article.subtitle}
        </h4>

        <h3 className="text-black font-bold line-clamp-4 text-3xl break-words">
          {article.title}
        </h3>

        <p className="text-gray-900 text-[18px] break-words">
          {article.description}
        </p>

        <h5 className="text-gray-700 text-[18px] line-clamp-4 mt-2 break-words">
          {authorName}
        </h5>
      </div>
    </Article>
  );
}
