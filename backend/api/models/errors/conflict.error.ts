import { CustomError } from './custom.error.js'

export class ConflictError extends CustomError {
	constructor(value?: any) {
		super(value || 'Se ha detectado un conflicto', 409)
	}
}
