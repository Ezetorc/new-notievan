import { z } from 'zod'

export const SignUpSchema = z.object({
	name: z
		.string()
		.min(6, 'El nombre es obligatorio')
		.max(100, 'El nombre no puede tener más de 100 carácteres'),

	email: z
		.email({ error: 'Lo que ingresaste no es un email' })
		.min(1, 'El email es obligatorio')
		.max(100, 'El email no puede tener más de 100 carácteres'),

	password: z
		.string()
		.min(6, 'La contraseña no puede tener menos de 6 carácteres')
		.max(150, 'La contraseña no puede tener más de 150 carácteres')
})

export type SignUpFormData = z.infer<typeof SignUpSchema>
