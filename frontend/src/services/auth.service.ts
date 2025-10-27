import type { LoginDtoType } from './../../../backend/src/models/dtos/login.dto';
import type { RegisterDtoType } from './../../../backend/src/models/dtos/register.dto';
import axios, { AxiosError } from "axios";
import { env } from "../configuration/env.configuration";
import type { AuthResponse } from '../models/auth-response.model';
import type { SanitizedUser } from '../../../backend/src/models/sanitized-user.model';
import { SessionService } from './session.service';

export class AuthService {
  private static API_BASE = `${env.baseUrl}/auth`;

  static async register(data: RegisterDtoType) {
    try {
      const response = await axios.post<AuthResponse>(`${this.API_BASE}/register`, data);

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.error || "Error al registrarse";
        throw new Error(message);
      }

      throw new Error("Error inesperado")
    }
  }

  static async login(data: LoginDtoType) {
    try {
      const response = await axios.post<AuthResponse>(`${this.API_BASE}/login`, data);

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.error || "Error al loguearse";
        throw new Error(message);
      }

      throw new Error("Error inesperado")
    }
  }

  static async getUser() {
    try {
      const response = await axios.get<SanitizedUser>(`${this.API_BASE}/`, {
        headers: {
          Authorization: `Bearer ${SessionService.token}`
        }
      });

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.error || "Error al obtener usuario";
        throw new Error(message);
      }

      throw new Error("Error inesperado")
    }
  }
}
