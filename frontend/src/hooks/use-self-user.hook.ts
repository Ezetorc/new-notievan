import { useQuery } from '@tanstack/react-query'
import { AuthService } from '../services/auth.service'

export function useSelfUser() {
	const { data, isLoading, isError, error, refetch } = useQuery({
		queryKey: ['self-user'],
		queryFn: () => AuthService.getUser(),
		retry: false,
		staleTime: 1000 * 60 * 5
	})

	return {
		user: data,
		isLoading,
		error,
		isError,
		refetch
	}
}
