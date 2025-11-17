import { useState } from 'react'
import { ZodError, type ZodType } from 'zod'
import type { FormEvent } from 'react'

export function useForm<T extends Record<string, unknown>>(
	onSuccess: (data: T) => void,
	schema: ZodType<T>,
	defaultData: T
) {
	const [error, setError] = useState<string>()
	const [data, setData] = useState<T>(defaultData)

	const onSubmit = (event?: FormEvent) => {
		event?.preventDefault()

		try {
			const validatedData = schema.parse(data) as T
			onSuccess(validatedData)
		} catch (error) {
			if (error instanceof ZodError) {
				setError(error.issues[0]?.message || 'Error de validación.')
			} else {
				setError('Ocurrió un error desconocido.')
			}
		}
	}

	const watch = (field: keyof T, value: T[keyof T]) => {
		setData((prev) => ({ ...prev, [field]: value }))
	}

	return { error, onSubmit, watch, data }
}
