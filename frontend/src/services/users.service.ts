import axios, { AxiosError } from 'axios'
import { env } from '../configuration/env.configuration'
import { SessionService } from './session.service'
import type { Role } from '../models/role.model'
import type { SanitizedUser } from '../models/sanitized-user.model'

export class UsersService {
  private static API_BASE = `${env.baseUrl}/users`

  static async getNameOfUser(id?: string): Promise<string> {
    try {
      if (!id) return ''

      const response = await axios.get<string>(
        `${UsersService.API_BASE}/${id}/name`
      )

      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.error || 'Error obteniendo nombre de usuario'
        throw new Error(message)
      }

      throw new Error('Error inesperado')
    }
  }

  static async getById(id: string): Promise<SanitizedUser> {
    try {
      const response = await axios.get<SanitizedUser>(
        `${UsersService.API_BASE}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${SessionService.token}`
          }
        }
      )

      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.error || 'Error obteniendo usuario'
        throw new Error(message)
      }

      throw new Error('Error inesperado')
    }
  }

  static async updateRole(id: string, role: Role): Promise<void> {
    try {
      await axios.patch(
        `${UsersService.API_BASE}/${id}/role`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${SessionService.token}`
          }
        }
      )
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.error || 'Error actualizando rol de usuario'
        throw new Error(message)
      }

      throw new Error('Error inesperado')
    }
  }

  static async update(id: string, data: { name: string }) {
    try {
      await axios.patch(`${UsersService.API_BASE}/${id}`, data, {
        headers: {
          Authorization: `Bearer ${SessionService.token}`
        }
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.error || 'Error actualizando usuario'
        throw new Error(message)
      }

      throw new Error('Error inesperado')
    }
  }

  static async getAll({
    page = 1,
    limit = 4
  }: {
    page?: number
    limit?: number
  } = {}): Promise<SanitizedUser[]> {
    try {
      const response = await axios.get(
        `${UsersService.API_BASE}?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${SessionService.token}`
          }
        }
      )

      return response.data
    } catch {
      return []
    }
  }
}
