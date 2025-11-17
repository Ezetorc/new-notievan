import type { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react'

export function ArticleInput(props: {
	className?: string
	placeholder?: string
	type?: HTMLInputTypeAttribute
	minLength?: number
	maxLength?: number
	defaultValue?: InputHTMLAttributes<HTMLInputElement>['defaultValue']
	onChange?: (value: string) => void
}) {
	return (
		<input
			required
			minLength={props.minLength}
			maxLength={props.maxLength}
			onChange={(event) => props.onChange?.(event.currentTarget.value)}
			type={props.type}
			defaultValue={props.defaultValue}
			placeholder={props.placeholder}
			className={`bg-gray-200 w-full p-4 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:ring-gray-800 focus:border-gray-800 ${props.className}`}
		/>
	)
}
