import { Hero } from '../components/Hero'

export default function NotFoundPage() {
	return (
		<>
			<Hero title='404' description='No se ha podido encontrar la página' />

			<a
				className='bg-brand-orange text-white text-2xl px-4 py-2 font-bold clickable rounded-[4px] text-center w-fit'
				href='/'
			>
				Volver al inicio
			</a>
		</>
	)
}
