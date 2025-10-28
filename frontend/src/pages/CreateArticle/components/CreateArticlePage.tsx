import { useLocation } from "wouter";
import { ArticleInput } from "../../../components/ArticleInput";
import { MarkdownEditor } from "../../../components/MarkdownEditor";
import { DesktopOnlyMessage } from "../../../components/DesktopOnlyMessage";
import { ErrorMessage } from "../../../components/ErrorMessage";
import { ImageInput } from "../../../components/ImageInput";
import {
  CreateArticleSchema,
  type CreateArticleFormData,
} from "../models/create-article-form-data.model";
import { useForm } from "../../../hooks/use-form.hook";
import { ArticlesService } from "../../../services/articles.service";
import { getFormDataFrom } from "../../../utilities/get-form-data-from.utility";
import { useQueryClient } from "@tanstack/react-query";
import { ActionButton } from "../../../components/ActionButton";
import { useState } from "react";

export default function CreateArticlePage() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const onSuccess = async (data: CreateArticleFormData) => {
    setIsLoading(true);
    const formData = getFormDataFrom(data)
    const newArticle = await ArticlesService.create(formData);

    queryClient.invalidateQueries({ queryKey: ["article", newArticle.id] });
    queryClient.invalidateQueries({
      predicate: q => Array.isArray(q.queryKey) && q.queryKey[0] === "articles",
    });

    setLocation("/articulos/" + newArticle.id);
  };

  const { error, onSubmit, watch } = useForm(onSuccess, CreateArticleSchema, {
    image: "",
    content: "",
    description: "",
    title: "",
    subtitle: "",
  });

  return (
    <>
      <DesktopOnlyMessage message="No puedes crear artículos desde el celular." />

      <form
        className="hidden md:flex flex-col pb-[5vw] mt-[60px]"
      >
        <ArticleInput
          placeholder="Subtítulo de tu artículo"
          maxLength={50}
          className="text-2xl font-bold font-text mb-5"
          onChange={(value) => watch("subtitle", value)}
        />

        <ArticleInput
          placeholder="Título de tu artículo"
          maxLength={50}
          className="text-5xl"
          onChange={(value) => watch("title", value)}
        />

        <ArticleInput
          className="mt-5 text-2xl mb-[30px]"
          placeholder="Descripción de tu artículo"
          onChange={(value) => watch("description", value)}
        />

        <div className="grid gap-x-10 grid-cols-[2fr_1fr]">
          <div className="flex flex-col justify-between gap-y-6">
            <MarkdownEditor
              onChange={(value) => watch("content", value)}
              placeholder="Contenido de tu artículo..."
            />

            <ActionButton className="w-full text-white font-bold text-3xl h-[70px]" loading={isLoading} onClick={onSubmit}>
              Crear artículo
            </ActionButton>
          </div>

          <aside className="flex flex-col gap-y-5">
            <ImageInput
              onImageSelected={(value) => watch("image", value)}
            />
          </aside>
        </div>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </form>
    </>
  );
}
