import { isSameDay } from './is-same-day.utility'

export function getParsedDate(date: Date): string {
	const today = new Date()
	const yesterday = new Date(today)
	yesterday.setDate(yesterday.getDate() - 1)

	const inputDate = new Date(date)

	if (isSameDay(inputDate, today)) {
		return 'Hoy'
	}

	if (isSameDay(inputDate, yesterday)) {
		return 'Ayer'
	}

	return inputDate.toLocaleDateString('es-AR', {
		dateStyle: 'short'
	})
}
