import type { Article } from '../../prisma/generated/prisma/client.js'
import cloudinary from '../configuration/cloudinary.configuration.js'

export class CloudinaryService {
	static async upload(
		fileBuffer: Buffer,
		filename: string,
		folder = 'articles'
	) {
		return new Promise<any>((resolve, reject) => {
			cloudinary.uploader
				.upload_stream({ folder, public_id: filename }, (error, result) => {
					if (error) reject(error)
					else resolve(result)
				})
				.end(fileBuffer)
		})
	}

	static async delete(publicId: string) {
		return new Promise<any>((resolve, reject) => {
			cloudinary.uploader.destroy(publicId, (error, result) => {
				if (error) reject(error)
				else resolve(result)
			})
		})
	}

	static extractIdOf(url: string) {
		const cloudinaryRegex =
			/https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/(?:v\d+\/)?(.+)\.(jpg|jpeg|png|gif|webp)$/
		const match = url.match(cloudinaryRegex)

		if (match && match[1]) {
			return decodeURIComponent(match[1])
		}
		return null
	}

	static async updateImage({
		file,
		article,
		body
	}: {
		article: Article
		file?: Express.Multer.File
		body: any
	}) {
		if (file) {
			if (article.image) {
				const publicId = CloudinaryService.extractIdOf(article.image)
				if (publicId) {
					await CloudinaryService.delete(publicId)
				}
			}

			const uploadResult = await CloudinaryService.upload(
				file.buffer,
				article.title
			)
			body.image = uploadResult.secure_url
		} else if (body.image && typeof body.image === 'string') {
			body.image = body.image
		}
	}
}
