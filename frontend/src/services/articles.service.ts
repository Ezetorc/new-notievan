import axios, { AxiosError } from "axios";
import type { Article } from "../../../backend/prisma/generated/prisma";
import { SessionService } from "./session.service";
import { env } from "../configuration/env.configuration";

export class ArticlesService {
  private static API_BASE = `${env.baseUrl}/articles`;

  static async create(data: FormData): Promise<Article> {
    try {
      const token = SessionService.token;
      const response = await axios.post<Article>(this.API_BASE, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.error || "Error al crear artículo";
        throw new Error(message);
      }

      throw new Error("Error inesperado")
    }
  }

  static async update(data: FormData, id: string): Promise<boolean> {
    try {
      const token = SessionService.token;

      const response = await axios.patch<{ success: true }>(`${this.API_BASE}/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.success;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.error || "Error al editar artículo";
        throw new Error(message);
      }

      throw new Error("Error inesperado")
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      const token = SessionService.token;

      await axios.delete(`${this.API_BASE}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return true;
    } catch {
      return false;
    }
  }

  static async getById(id: string): Promise<Article | undefined> {
    try {
      const response = await axios.get<Article>(`${this.API_BASE}/${id}`);

      return response.data;
    } catch {
      return undefined;
    }
  }

  static async getAll(
    {
      page = 1,
      limit = 4,
    }: {
      page?: number;
      limit?: number;
    } = {}
  ): Promise<Article[]> {
    try {
      const response = await axios.get(
        `${this.API_BASE}?page=${page}&limit=${limit}`
      );

      return response.data.data;
    } catch {
      return [];
    }
  }

  static async getOwn(
    {
      page = 1,
      limit = 4,
    }: {
      page?: number;
      limit?: number;
    } = {}
  ): Promise<Article[]> {
    try {
      const token = SessionService.token;

      const response = await axios.get< { data: Article[] }>(
        `${this.API_BASE}/own?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.data;
    } catch {
      return [];
    }
  }

  static async getRandom(omitId: string): Promise<Article[]> {
    try {
      const response = await axios.get<Article[]>(
        `${this.API_BASE}/random?omit=${omitId}`
      );

      return response.data;
    } catch {
      return [];
    }
  }
}
