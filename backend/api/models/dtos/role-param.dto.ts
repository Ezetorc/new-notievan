import z from 'zod'
import { Role } from '../../../prisma/generated/prisma/index.js'

export const RoleParamDto = z.object({
	role: z.enum(Role)
})
