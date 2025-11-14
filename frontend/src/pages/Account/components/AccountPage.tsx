import { useLocation } from 'wouter'
import { Hero } from '../../../components/Hero'
import { getDisplayableDate } from '../utilities/get-displayable-date.utility'
import { AccountArticles } from './AccountArticles'
import { UserInfo } from './UserInfo'
import { useSession } from '../../../hooks/use-session.hook'

export default function AccountPage() {
	const { user, logout } = useSession()
	const [, setLocation] = useLocation()

	const handleLogout = () => {
		logout()
		setLocation('/sesion')
	}

	if (!user) return

	return (
		<>
			<Hero title='Cuenta' description='Mirá y cambiá tu información' />

			<article className='flex flex-col gap-y-16'>
				<div className='flex flex-col gap-y-6 text-lg'>
					<UserInfo name='Nombre de usuario' value={user.name} />
					<UserInfo name='Email' value={user.email} />
					<UserInfo
						name='Fecha de creación'
						value={getDisplayableDate(user.createdAt)}
					/>
					<UserInfo name='Identificador de usuario' value={user.id} />
				</div>

				<button
					type='button'
					onClick={handleLogout}
					className='w-fit px-4 py-3 clickable bg-brand-orange rounded-[4px] text-white text-3xl'
				>
					Cerrar sesión
				</button>
			</article>

			<AccountArticles />
		</>
	)
}
