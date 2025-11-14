import { useEffect } from 'react'

export function Modal({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		const originalStyle = window.getComputedStyle(document.body).overflow

		document.body.style.overflow = 'hidden'

		return () => {
			document.body.style.overflow = originalStyle
		}
	}, [])

	return (
		<div className='w-screen grid place-items-center h-screen fixed bg-[#000b] z-50 left-0 top-0 overflow-y-auto'>
			<div className='scale-up'>{children}</div>
		</div>
	)
}
