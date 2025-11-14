import type { ReactNode } from 'react'
import { ActionButton } from './ActionButton'

export function LoadMoreButton(props: {
	loading?: boolean
	onClick: () => void
	children?: ReactNode
}) {
	return (
		<ActionButton
			loading={props.loading}
			onClick={props.onClick}
			className='clickable w-full mt-4 py-2 text-white font-bold text-xl bg-brand-blue rounded-sm'
		>
			{props.children}
		</ActionButton>
	)
}
