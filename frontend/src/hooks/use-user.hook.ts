import { useQuery } from '@tanstack/react-query'
import { UsersService } from '../services/users.service'

export function useUser(userId?: string) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => {
      if (!userId) return
      return UsersService.getById(userId)
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(userId)
  })

  return {
    user: data,
    isLoading,
    error,
    isError,
    refetch
  }
}
