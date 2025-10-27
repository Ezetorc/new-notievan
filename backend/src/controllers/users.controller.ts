import { NotFoundError } from "../models/errors/not-found.error.js";
import { UsersRepository } from "../repositories/users.repository.js";
import { UserIdParamDto } from "../models/dtos/user-id-param.dto.js";
import { type Request, type Response } from "express";
import { prisma } from "../configuration/prisma.configuration.js";
import { PaginationParamsDto } from "../models/dtos/pagination-params.dto.js";
import { SanitizedUser } from "../models/sanitized-user.model.js";
import { RoleParamDto } from "../models/dtos/role-param.dto.js";
import { Role } from "../../prisma/generated/prisma/client.js";
import { ForbiddenError } from "../models/errors/forbidden.error.js";

export class UsersController {
    static async getNameById(request: Request, response: Response) {
        const { id } = UserIdParamDto.parse(request.params);
        const name = await UsersRepository.findNameById(id)

        if (!name) throw new NotFoundError("Usuario no encontrado");

        return response.json(name)
    }

    static async updateRole(request: Request, response: Response) {
        console.log(request.user)
        if (request.user?.role !== Role.ADMIN) throw new ForbiddenError("No tenés acceso");

        const { id } = UserIdParamDto.parse(request.params);
        const { role } = RoleParamDto.parse(request.body);
        const user = await UsersRepository.updateRole(id, role)

        if (!user) throw new NotFoundError("Usuario no encontrado");

        return response.json(user)
    }

    static async getAll(request: Request, response: Response) {
        const { limit, page } = PaginationParamsDto.parse(request.query);
        const skip = (page - 1) * limit;
        const users = await UsersRepository.findAll(limit, skip)
        const totalUsers = await prisma.user.count();
        const totalPages = Math.ceil(totalUsers / limit);
        const sanitizedUsers = users.map((user) => new SanitizedUser(user))

        return response.json({
            data: sanitizedUsers,
            meta: {
                page,
                limit,
                totalPages,
                totalUsers,
            },
        })
    }
}
