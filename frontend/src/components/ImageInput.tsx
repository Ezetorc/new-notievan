import { useState, type ChangeEvent } from 'react'

export function ImageInput({
	onImageSelected,
	value
}: {
	onImageSelected: (image: string | File) => void
	value?: string | File
}) {
	const [image, setImage] = useState<string | File>(value || '')
	const [imageMode, setImageMode] = useState<'file' | 'url'>('file')

	const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (!file) return

		setImage(file)
		const reader = new FileReader()
		reader.onload = () => {
			const base64 = reader.result as string
			setImage(base64)
			onImageSelected(file)
		}
		reader.readAsDataURL(file)
	}

	const onUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.currentTarget.value

		setImage(value)
		onImageSelected(value)
	}

	return (
		<div className='w-[300px] flex flex-col gap-y-2'>
			<header className='flex gap-2 mb-2'>
				<button
					type='button'
					className={`flex-1 py-2 px-4 clickable rounded-md font-semibold ${
						imageMode === 'file' ? 'bg-brand-orange text-white' : 'bg-gray-200'
					}`}
					onClick={() => {
						setImageMode('file')
						setImage('')
					}}
				>
					Subir archivo
				</button>
				<button
					type='button'
					className={`flex-1 py-2 px-4 clickable rounded-md font-semibold ${
						imageMode === 'url' ? 'bg-brand-orange text-white' : 'bg-gray-200'
					}`}
					onClick={() => {
						setImageMode('url')
						setImage('')
					}}
				>
					Usar URL
				</button>
			</header>

			{imageMode === 'file' ? (
				<main>
					<input
						type='file'
						id='image-input'
						accept='image/*'
						className='hidden'
						onChange={onFileChange}
					/>
					<label
						htmlFor='image-input'
						className='cursor-pointer flex flex-col gap-y-2'
					>
						<div className='max-h-[400px] max-w-[300px] aspect-video bg-gray-200'>
							{image && typeof image === 'string' ? (
								<img
									src={image}
									alt='Vista previa'
									className='w-full h-full object-cover'
								/>
							) : (
								<div className='w-full h-full flex items-center justify-center'>
									<span className='text-gray-500 text-lg text-center p-4'>
										Clickeá para elegir la portada del artículo
									</span>
								</div>
							)}
						</div>
					</label>
				</main>
			) : (
				<main className='flex flex-col gap-2'>
					<input
						type='url'
						placeholder='Pegá la URL de la imagen'
						className='border rounded-md p-2'
						value={typeof image === 'string' ? image : ''}
						onChange={onUrlChange}
					/>
					{typeof image === 'string' && image && (
						<img
							src={image}
							alt='Vista previa'
							className='w-full max-h-[400px] max-w-[300px] aspect-video rounded-md object-cover border border-gray-300'
						/>
					)}
				</main>
			)}

			<footer className='text-sm text-gray-700 text-center'>
				Se recomienda usar imágenes de 1200 pixeles de ancho y 675 pixeles de
				alto <strong>(1200x675)</strong>
			</footer>
		</div>
	)
}