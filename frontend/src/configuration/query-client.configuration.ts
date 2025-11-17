import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: true,
			staleTime: 1000 * 60 * 5,
			gcTime: 1000 * 60 * 5
		}
	}
})
