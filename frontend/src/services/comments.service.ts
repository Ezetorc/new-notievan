import axios, { AxiosError } from 'axios'
import type { Comment } from '../../../backend/prisma/generated/prisma'
import { SessionService } from './session.service'
import { env } from '../configuration/env.configuration'

export class CommentsService {
  private static API_BASE = `${env.baseUrl}/comments`

  static async create({
    articleId,
    content
  }: {
    articleId: string
    content: string
  }): Promise<Comment> {
    try {
      const token = SessionService.token
      const response = await axios.post<Comment>(
        CommentsService.API_BASE,
        {
          articleId,
          content
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.error || 'Error al crear comentario'
        throw new Error(message)
      }

      throw new Error('Error inesperado')
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      const token = SessionService.token

      await axios.delete(`${CommentsService.API_BASE}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return true
    } catch {
      return false
    }
  }

  static async getAllOfArticle({
    page = 1,
    limit = 4,
    articleId
  }: {
    page?: number
    limit?: number
    articleId: string
  }): Promise<Comment[]> {
    try {
      const response = await axios.get(
        `${CommentsService.API_BASE}/article/${articleId}?page=${page}&limit=${limit}`
      )

      return response.data
    } catch {
      return []
    }
  }
}
