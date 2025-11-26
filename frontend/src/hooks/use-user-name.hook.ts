import { useQuery } from '@tanstack/react-query'
import { UsersService } from '../services/users.service'

export function useUserName(authorId?: string) {
	const { data: name = '' } = useQuery({
		queryKey: ['userName', authorId],
		queryFn: () => {
			if (!authorId) throw new Error('No authorId provided')
			return UsersService.getNameOfUser(authorId)
		},
		enabled: !!authorId,
		staleTime: 1000 * 60 * 5
	})

	return name
}
