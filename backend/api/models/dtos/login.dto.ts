import { z } from 'zod'

export const LoginDto = z.object({
	email: z.email(),
	password: z.string().min(6).max(30)
})

export type LoginDtoType = z.infer<typeof LoginDto>
