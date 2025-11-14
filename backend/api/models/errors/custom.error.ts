export class CustomError {
	code: number
	value: any

	constructor(value: any, status?: number) {
		this.value = value
		this.code = status || 500
	}
}
