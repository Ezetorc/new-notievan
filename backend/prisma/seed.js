import { PrismaClient } from './generated/prisma/index.js'

const prisma = new PrismaClient()

async function main() {
	await prisma.comment.create({
		data: {
			articleId: 'cmhxvwg5z0001ljhka5guidw8',
			content: 'Wow este es el primer comentario del NotiEvan omg!!!',
			authorId: 'cmh2e2v1x0000lja0qm2o5ivq'
		}
	})
}

main()
	.then(async () => {
		await prisma.$disconnect()
		console.log('Seeds completed')
	})
	.catch(async (error) => {
		console.error(error)

		await prisma.$disconnect()

		process.exit(1)
	})
