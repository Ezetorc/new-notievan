import { z } from 'zod'

export const EditArticleSchema = z
	.object({
		subtitle: z
			.string()
			.min(1, 'El subtítulo es obligatorio')
			.max(50, 'El subtítulo no puede tener más de 50 caracteres'),

		title: z
			.string()
			.min(1, 'El título es obligatorio')
			.max(150, 'El título no puede tener más de 150 caracteres'),

		description: z
			.string()
			.min(1, 'La descripción es obligatoria')
			.max(300, 'La descripción no puede tener más de 300 caracteres'),

		content: z.string().min(1, 'El contenido no puede estar vacío'),

		image: z.union([
			z.url('Debés seleccionar una imágen'),
			z.instanceof(File, { message: 'Debés seleccionar una imágen' })
		])
	})
	.partial()

export type EditArticleFormData = z.infer<typeof EditArticleSchema>
