import { subDays, isToday, isYesterday, isSameDay } from 'date-fns'

export function isRecent(date: Date): boolean {
	const today = new Date()
	const dayBeforeYesterday = subDays(today, 2)

	return (
		isToday(date) || isYesterday(date) || isSameDay(date, dayBeforeYesterday)
	)
}
