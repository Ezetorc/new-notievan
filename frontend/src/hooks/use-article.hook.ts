import { useQuery } from "@tanstack/react-query";
import { ArticlesService } from "../services/articles.service";

export function useArticle(id: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["article", id],
    queryFn: () => ArticlesService.getById(id),
    staleTime: 1000 * 60 * 5,
  });

  return {
    article: data,
    isLoading,
    error,
    isError,
  };
}
