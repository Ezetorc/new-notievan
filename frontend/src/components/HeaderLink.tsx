import type { HTMLAttributeAnchorTarget, ReactNode } from 'react'

export function HeaderLink(props: {
	children: ReactNode
	className?: string
	href: string
	target?: HTMLAttributeAnchorTarget
	ariaLabel?: string
}) {
	return (
		<a
			href={props.href}
			target={props.target}
			aria-label={props.ariaLabel}
			className={`clickable mobile:text-[25px] desktop:text-2xl ${props.className}`}
		>
			{props.children}
		</a>
	)
}
