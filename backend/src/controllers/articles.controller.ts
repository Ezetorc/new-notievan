import { UserIdParamDto } from "../models/dtos/user-id-param.dto.js";
import { ArticlesRepository } from "../repositories/articles.repository.js";
import { NotFoundError } from "../models/errors/not-found.error.js";
import { UnauthorizedError } from "../models/errors/unauthorized.error.js";
import { CloudinaryService } from "../services/cloudinary.service.js";
import type { Request, Response } from 'express';
import { UpdateArticleDto } from "../models/dtos/update-article.dto.js";
import { CreateArticleDto } from "../models/dtos/create-article.dto.js";
import { prisma } from "../configuration/prisma.configuration.js";
import { ForbiddenError } from "../models/errors/forbidden.error.js";
import { PaginationParamsDto } from "../models/dtos/pagination-params.dto.js";
import { OmitIdParamDto } from "../models/dtos/omit-id-param.dto.js";
import { Role } from "../../prisma/generated/prisma/index.js";

export class ArticlesController {
	static async getById(request: Request, response: Response) {
		const { id } = UserIdParamDto.parse(request.params);
		const article = await ArticlesRepository.findById(id)

		if (!article) throw new NotFoundError("Artículo no encontrado");

		return response.json(article)
	}

	static async delete(request: Request, response: Response) {
		const { id } = UserIdParamDto.parse(request.params);
		const article = await ArticlesRepository.findById(id)

		if (!article) throw new NotFoundError("Artículo no encontrado");

		if (request.user?.id !== article.authorId) throw new UnauthorizedError("No podés eliminar artículos de otra persona");

		await ArticlesRepository.delete(id)

		if (article.image) {
			const publicId = CloudinaryService.extractIdOf(article.image);

			if (publicId) {
				await CloudinaryService.delete(publicId);
			}
		}

		return response.json({ value: "Artículo eliminado" })
	}

	static async update(request: Request, response: Response) {
		const { id } = UserIdParamDto.parse(request.params);
		const article = await ArticlesRepository.findById(id);

		if (!article) throw new NotFoundError("Artículo no encontrado");

		if (request.user?.id !== article.authorId) throw new UnauthorizedError("No se puede editar artículos de otros");

		const { body, file } = request;

		await CloudinaryService.updateImage({ file, body, article })

		const data = UpdateArticleDto.parse(body);

		await ArticlesRepository.update(id, data);

		return response.json({ success: true });
	}

	static async create(request: Request, response: Response) {
		if (request.user?.role !== Role.AUTHOR && request.user?.role !== Role.ADMIN) throw new ForbiddenError("No tenés acceso");

		const { body, file } = request;
		const data = CreateArticleDto.parse(body);

		let image: string = "";

		if (file) {
			const uploadResult = await CloudinaryService.upload(file.buffer, file.originalname, "articles");
			image = uploadResult.secure_url;
		} else if (typeof data.image === "string") {
			image = data.image;
		}

		const { image: _discard, ...rest } = data;

		const article = await prisma.article.create({
			data: {
				...rest,
				image,
				authorId: request.user.id,
			},
		});

		return response.status(201).json(article);
	}

	static async getAll(request: Request, response: Response) {
		const { limit, page } = PaginationParamsDto.parse(request.query);
		const skip = (page - 1) * limit;
		const articles = await ArticlesRepository.getAll(limit, skip)
		const totalArticles = await prisma.article.count();
		const totalPages = Math.ceil(totalArticles / limit);

		return response.json({
			data: articles,
			meta: {
				page,
				limit,
				totalPages,
				totalArticles,
			},
		})
	}

	static async getOwn(request: Request, response: Response) {
		const { limit, page } = PaginationParamsDto.parse(request.query);
		const skip = (page - 1) * limit;
		const articles = await ArticlesRepository.getOwn(limit, skip, request.user.id)
		const totalArticles = await prisma.article.count();
		const totalPages = Math.ceil(totalArticles / limit);

		return response.json({
			data: articles,
			meta: {
				page,
				limit,
				totalPages,
				totalArticles,
			},
		})
	}

	static async getRandom(request: Request, response: Response) {
		const { omit } = OmitIdParamDto.parse(request.query);
		const allArticleIds = await ArticlesRepository.getRandomIds(omit)
		const shuffledIds = allArticleIds
			.map((a) => a.id)
			.sort(() => 0.5 - Math.random())
			.slice(0, 4);
		const articles = await ArticlesRepository.getByIds(shuffledIds)

		return response.json(articles);
	}
}