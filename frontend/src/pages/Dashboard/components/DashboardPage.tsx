import { Hero } from '../../../components/Hero'
import { Loading } from '../../../components/Loading'
import { LoadMoreButton } from '../../../components/LoadMoreButton'
import { usePaginatedUsers } from '../../../hooks/use-paginated-users.hook'
import { UserDisplay } from './UserDisplay'

export default function DashboardPage() {
	const { users, hasMore, loadMore, loading } = usePaginatedUsers()

	if (users.length === 0) return <Loading />

	return (
		<>
			<Hero title='Dashboard' description='Administrá usuarios' />

			<section className='my-9'>
				<div className='overflow-x-auto'>
					<table className='min-w-full border-collapse'>
						<thead>
							<tr className='bg-gray-100'>
								<th className='p-3 text-left border'>Nombre</th>
								<th className='p-3 text-left border'>Email</th>
								<th className='p-3 text-left border'>ID</th>
								<th className='p-3 text-left border'>Rol</th>
								<th className='p-3 text-left border'>Cambiar rol</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<UserDisplay user={user} key={user.id} />
							))}
						</tbody>
					</table>
				</div>

				{hasMore && (
					<LoadMoreButton loading={loading} onClick={loadMore}>
						Ver más
					</LoadMoreButton>
				)}
			</section>
		</>
	)
}
