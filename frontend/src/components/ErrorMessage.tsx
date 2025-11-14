import type { ReactNode } from 'react'

export function ErrorMessage({ children }: { children: ReactNode }) {
	return <p className='text-red-500'>{children}</p>
}
