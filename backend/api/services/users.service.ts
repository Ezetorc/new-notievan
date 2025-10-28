import type { Role } from "../../prisma/generated/prisma/index.js";
import { NotFoundError } from "../models/errors/not-found.error.js";
import { UsersRepository } from "../repositories/users.repository.js";

export class UsersService {
  static async getById(id: string) {
    const user = await UsersRepository.findById(id)

    if (!user) throw new NotFoundError("Usuario no encontrado");

    return user
  }

  static async getNameById(id: string) {
    const name = await UsersRepository.findNameById(id)

    if (!name) throw new NotFoundError("Usuario no encontrado");

    return name
  }

  static async updateRole(id: string, role: Role) {
    const user = await UsersRepository.updateRole(id, role)

    if (!user) throw new NotFoundError("Usuario no encontrado");

    return user
  }

  static async getAll(limit: number, skip: number) {
    return await UsersRepository.findAll(limit, skip)
  }
}