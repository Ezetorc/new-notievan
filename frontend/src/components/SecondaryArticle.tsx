import { Article } from "./Article";
import type { Article as ArticleData } from "../../../backend/prisma/generated/prisma";
import { useAuthorName } from "../hooks/use-author-name.hook";

interface Props {
  article?: ArticleData;
}

export function SecondaryArticle({ article }: Props) {
  const authorName = useAuthorName(article?.authorId);

  if (!article) {
    return (
      <article className="animate-pulse flex flex-col gap-y-4 w-full">
        <div className="min-h-[100px] max-h-[200px] h-full aspect-9/16 bg-gray-300 w-full object-cover"></div>
        <div className="flex flex-col gap-y-2 w-full">
          <div className="h-6 w-[80%] bg-gray-300 rounded-[8px]" />
          <div className="h-8 w-[90%] bg-gray-300 rounded-[8px]" />
          <div className="h-4 w-[50%] bg-gray-300 rounded-[8px]" />
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
        className="min-h-[100px] max-h-[200px] h-full aspect-9/16 bg-gray-200 w-full object-cover"
      />

      <div className="flex flex-col gap-y-2 w-full">
        <h4 className="text-brand-red text-3xl wrap-break-word">
          {article.subtitle}
        </h4>

        <h3 className="text-black font-bold line-clamp-4 text-3xl wrap-break-word">
          {article.title}
        </h3>

        <h5 className="text-gray-700 text-[18px] line-clamp-4 mt-2 wrap-break-word">
          {authorName}
        </h5>
      </div>
    </Article>
  );
}
