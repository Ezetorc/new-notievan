export function UserInfo({ name, value }: { name: string; value: string }) {
	return (
		<div>
			<h3 className='text-3xl font-semibold mb-1'>{name}</h3>
			<p className='text-2xl'>{value}</p>
		</div>
	)
}
