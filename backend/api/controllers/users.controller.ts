import { CUIDParamDto } from '../models/dtos/user-id-param.dto.js'
import type { Request, Response } from 'express'
import { PaginationParamsDto } from '../models/dtos/pagination-params.dto.js'
import { SanitizedUser } from '../models/sanitized-user.model.js'
import { RoleParamDto } from '../models/dtos/role-param.dto.js'
import { UsersService } from '../services/users.service.js'

export class UsersController {
	static async getNameById(request: Request, response: Response) {
		const { id } = CUIDParamDto.parse(request.params)
		const name = await UsersService.getNameById(id)

		return response.json(name)
	}

	static async updateRole(request: Request, response: Response) {
		const { id } = CUIDParamDto.parse(request.params)
		const { role } = RoleParamDto.parse(request.body)
		const user = await UsersService.updateRole(id, role)

		return response.json(user)
	}

	static async getAll(request: Request, response: Response) {
		const { limit, page } = PaginationParamsDto.parse(request.query)
		const skip = (page - 1) * limit
		const users = await UsersService.getAll(limit, skip)
		const sanitizedUsers = users.map((user) => new SanitizedUser(user))

		return response.json(sanitizedUsers)
	}
}
