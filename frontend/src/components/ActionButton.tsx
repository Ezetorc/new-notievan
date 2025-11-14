import type { ReactNode, MouseEvent } from 'react'

export function ActionButton(props: {
	onClick: (event: MouseEvent<HTMLButtonElement>) => void
	children?: ReactNode
	className?: string
	loading?: boolean
}) {
	const loading = props.loading ?? false

	return (
		<button
			type='button'
			onClick={props.onClick}
			disabled={loading}
			aria-busy={loading}
			className={`clickable rounded-sm disabled:opacity-60 disabled:cursor-not-allowed ${props.className}`}
		>
			{loading ? 'Cargando...' : props.children}
		</button>
	)
}
