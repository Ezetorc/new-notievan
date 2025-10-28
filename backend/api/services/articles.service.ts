import type { Request } from "express";
import { type UpdateArticleType } from "../models/dtos/update-article.dto.js";
import { NotFoundError } from "../models/errors/not-found.error.js";
import { UnauthorizedError } from "../models/errors/unauthorized.error.js";
import { ArticlesRepository } from "../repositories/articles.repository.js";
import { CloudinaryService } from "./cloudinary.service.js";
import { type CreateArticleType } from "../models/dtos/create-article.dto.js";

export class ArticlesService {
  static async getById(id: string) {
    const article = await ArticlesRepository.findById(id)

    if (!article) throw new NotFoundError("Artículo no encontrado");

    return article
  }

  static async delete(id: string) {
    const article = await ArticlesRepository.findById(id)

    if (!article) throw new NotFoundError("Artículo no encontrado");

    await ArticlesRepository.delete(id)

    if (article.image) {
      const publicId = CloudinaryService.extractIdOf(article.image);

      if (publicId) {
        await CloudinaryService.delete(publicId);
      }
    }

    return { value: "Artículo eliminado" }
  }

  static async update(id: string, data: UpdateArticleType, request: Request) {
    const article = await ArticlesRepository.findById(id);

    if (!article) throw new NotFoundError("Artículo no encontrado");

    if (request.user?.id !== article.authorId) throw new UnauthorizedError("No se puede editar artículos de otros");

    const { body, file } = request;

    await CloudinaryService.updateImage({ file, body, article })

    const updatedArticle = await ArticlesRepository.update(id, data)

    return Boolean(updatedArticle)
  }

  static async create(data: CreateArticleType, request: Request) {
    const { file } = request;

    let image: string = "";

    if (file) {
      const uploadResult = await CloudinaryService.upload(file.buffer, file.originalname, "articles");
      image = uploadResult.secure_url;
    } else if (typeof data.image === "string") {
      image = data.image;
    }

    const article = await ArticlesRepository.create({ ...data, image, authorId: request.user.id });

    return article
  }

  static async getAll(limit: number, skip: number) {
    const articles = await ArticlesRepository.getAll(limit, skip)

    return articles
  }

  static async getOwn(limit: number, skip: number, userId: string) {
    const articles = await ArticlesRepository.getOwn(limit, skip, userId)

    return articles
  }

  static async getRandom(omitId: string) {
    const allArticleIds = await ArticlesRepository.getRandomIds(omitId)
    const shuffledIds = allArticleIds
      .map((a) => a.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
    const articles = await ArticlesRepository.getByIds(shuffledIds)

    return articles
  }
}