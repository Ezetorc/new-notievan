import axios, { AxiosError } from 'axios'
import { env } from '../configuration/env.configuration'
import type { AuthResponse } from '../models/auth-response.model'
import { SessionService } from './session.service'
import type { SignUpFormData } from '../pages/SignUp/models/sign-up-form-data.model'
import type { SignInFormData } from '../pages/SignIn/models/sign-in-form-data.model'
import type { SanitizedUser } from '../models/sanitized-user.model'

export class AuthService {
	private static API_BASE = `${env.baseUrl}/auth`

	static async register(data: SignUpFormData) {
		try {
			const response = await axios.post<AuthResponse>(
				`${AuthService.API_BASE}/register`,
				data
			)

			return response.data
		} catch (error) {
			if (error instanceof AxiosError) {
				const message = error.response?.data?.error || 'Error al registrarse'
				throw new Error(message)
			}

			throw new Error('Error inesperado')
		}
	}

	static async login(data: SignInFormData) {
		try {
			const response = await axios.post<AuthResponse>(
				`${AuthService.API_BASE}/login`,
				data
			)

			return response.data
		} catch (error) {
			if (error instanceof AxiosError) {
				const message = error.response?.data?.error || 'Error al loguearse'
				throw new Error(message)
			}

			throw new Error('Error inesperado')
		}
	}

	static async getUser() {
		try {
			const response = await axios.get<SanitizedUser>(
				`${AuthService.API_BASE}/`,
				{
					headers: {
						Authorization: `Bearer ${SessionService.token}`
					}
				}
			)

			return response.data
		} catch (error) {
			if (error instanceof AxiosError) {
				const message =
					error.response?.data?.error || 'Error al obtener usuario'
				throw new Error(message)
			}

			throw new Error('Error inesperado')
		}
	}
}
