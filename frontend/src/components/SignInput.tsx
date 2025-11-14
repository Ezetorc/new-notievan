import type { HTMLInputTypeAttribute, ReactNode } from 'react'
import { forwardRef } from 'react'

export const SignInput = forwardRef<
	HTMLInputElement,
	{
		placeholder?: string
		type?: HTMLInputTypeAttribute
		name: string
		children: ReactNode
		minLength?: number
		maxLength?: number
		onChange?: (value: string) => void
	}
>(
	(
		{
			placeholder,
			type,
			name,
			children,
			minLength,
			onChange,
			maxLength,
			...rest
		},
		ref
	) => {
		return (
			<div>
				<label htmlFor={name} className='block text-[24px] text-gray-700'>
					{children}
				</label>
				<input
					id={name}
					name={name}
					minLength={minLength}
					maxLength={maxLength}
					type={type}
					placeholder={placeholder}
					required
					onChange={(event) => onChange?.(event.currentTarget.value)}
					ref={ref}
					className='w-full p-4 placeholder:text-[20px] mt-1 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:ring-gray-800 focus:border-gray-800 sm:text-base'
					{...rest}
				/>
			</div>
		)
	}
)
