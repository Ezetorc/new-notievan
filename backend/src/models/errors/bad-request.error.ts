import { CustomError } from "./custom.error.js";

export class BadRequestError extends CustomError {
  constructor(value?: any) {
    super(value || "Los datos son incorrectos", 400)
  }
}