import { CustomError } from './custom.error.js'

export class UnauthorizedError extends CustomError {
	constructor(value?: any) {
		super(value || 'No tienes el permiso requerido', 401)
	}
}
