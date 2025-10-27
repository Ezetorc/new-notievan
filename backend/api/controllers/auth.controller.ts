import { RegisterDto } from "../models/dtos/register.dto.js";
import { AuthService } from "../services/auth.service.js";
import { SanitizedUser } from "../models/sanitized-user.model.js";
import { LoginDto } from "../models/dtos/login.dto.js";
import type { Request, Response } from "express";
import { UsersRepository } from "../repositories/users.repository.js";
import { NotFoundError } from "../models/errors/not-found.error.js";

export class AuthController {
    static async register(request: Request, response: Response) {
        const { email, password, name } = RegisterDto.parse(request.body);
        const { user, token } = await AuthService.register(name, email, password)

        return response.status(201).json({ user: new SanitizedUser(user), token })
    }

    static async login(request: Request, response: Response) {
        const { email, password } = LoginDto.parse(request.body);
        const { user, token } = await AuthService.login(email, password)

        return response.json({ user: new SanitizedUser(user), token })
    }

    static async getSelf(request: Request, response: Response) {
        const user = await UsersRepository.findById(request.user.id)

        if (!user) throw new NotFoundError("Usuario no encontrado")

        return response.json(new SanitizedUser(user))
    }
}
