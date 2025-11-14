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
		<div className='w-full flex flex-col gap-y-2'>
			<div className='flex gap-2 mb-2'>
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
			</div>

			{imageMode === 'file' ? (
				<div>
					<input
						type='file'
						id='image-input'
						accept='image/*'
						className='hidden'
						onChange={onFileChange}
					/>
					<label
						htmlFor='image-input'
						className='cursor-pointer w-full aspect-video rounded-md border border-gray-300 overflow-hidden flex items-center justify-center bg-gray-200'
					>
						{image ? (
							<img
								src={typeof image === 'string' ? image : undefined}
								alt='Vista previa'
								className='w-full h-full object-cover'
							/>
						) : (
							<span className='text-gray-500 text-2xl text-center p-4'>
								Clickeá para elegir la portada del artículo
							</span>
						)}
					</label>
				</div>
			) : (
				<div className='flex flex-col gap-2'>
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
							className='w-full aspect-video rounded-md object-cover border border-gray-300'
						/>
					)}
				</div>
			)}
		</div>
	)
}
