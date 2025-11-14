import { CustomError } from './custom.error.js'

export class NotFoundError extends CustomError {
	constructor(value?: any) {
		super(value || 'No se encontró la entidad', 404)
	}
}
