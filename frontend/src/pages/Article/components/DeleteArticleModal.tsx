import type { Dispatch, SetStateAction } from "react";
import { useLocation } from "wouter";
import { ArticlesService } from "../../../services/articles.service";
import type { Article } from "../../../../../backend/prisma/generated/prisma";

export function DeleteArticleModal({
  setIsModalOpen,
  article,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  article: Article;
}) {
  const [, setLocation] = useLocation();

  const handleDelete = async () => {
    try {
      await ArticlesService.delete(article.id);

      setLocation("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-screen grid place-items-center h-screen fixed bg-[#000b] z-50 left-0 top-0">
      <div className="p-6 mobile:w-[80vw] space-y-5 tablet:w-[40vw] bg-brand-blue rounded-2xl">
        <h2 className="text-white text-6xl font-title">
          ¿Querés eliminar el artículo: "{article.title}"?
        </h2>

        <div className="space-x-6">
          <button
            className="px-3 py-4 text-2xl bg-brand-orange clickable rounded text-white font-bold"
            onClick={() => setIsModalOpen(false)}
          >
            Cancelar
          </button>
          <button
            className="px-3 py-4 text-2xl bg-brand-red clickable rounded text-white font-bold"
            onClick={handleDelete}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
