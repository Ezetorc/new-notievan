import * as z from 'zod'

export const UpdateUserDto = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres').max(50, 'El nombre debe tener menos de 50 caracteres'),
})

export type UpdateUserDtoType = z.infer<typeof UpdateUserDto>
