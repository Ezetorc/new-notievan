import type { Dispatch, SetStateAction } from 'react'
import { ActionButton } from '../../../components/ActionButton'
import { useQueryClient } from '@tanstack/react-query'
import { CommentsService } from '../../../services/comments.service'
import { Modal } from '../../../components/Modal'
import { ErrorMessage } from '../../../components/ErrorMessage'
import { useForm } from '../../../hooks/use-form.hook'
import { z } from 'zod'

const CreateCommentSchema = z.object({
	content: z
		.string()
		.min(1, 'El comentario debe tener al menos 1 caracter')
		.max(255, 'El comentario debe tener menos de 255 caracteres'),
	articleId: z.string()
})

type CreateCommentFormData = z.infer<typeof CreateCommentSchema>

export function CreateCommentModal({
	setIsModalOpen,
	articleId
}: {
	setIsModalOpen: Dispatch<SetStateAction<boolean>>
	articleId: string
}) {
	const queryClient = useQueryClient()

	const onSuccess = async (data: CreateCommentFormData) => {
		await CommentsService.create(data)
		queryClient.invalidateQueries({ queryKey: ['comments', articleId] })
		setIsModalOpen(false)
	}

	const { error, onSubmit, watch } = useForm(onSuccess, CreateCommentSchema, {
		content: '',
		articleId
	})

	return (
		<Modal>
			<div className='p-6 mobile:w-[90vw] space-y-5 tablet:w-[40vw] bg-brand-blue rounded-2xl'>
				<header className='w-full flex justify-between'>
					<h2 className='text-white text-6xl font-title'>
						Crear nuevo comentario
					</h2>

					<button
						type='button'
						className='clickable text-4xl text-white font-bold'
						onClick={() => setIsModalOpen(false)}
					>
						X
					</button>
				</header>

				<textarea
					onInput={(event) => watch('content', event.currentTarget.value)}
					placeholder='Me gustó este artículo porque...'
					className='w-full bg-brand-blue-light rounded-2xl p-4 text-2xl h-[200px] resize-none'
				/>

				{error && <ErrorMessage>{error}</ErrorMessage>}

				<ActionButton
					onClick={onSubmit}
					className='text-2xl bg-brand-orange text-white font-bold py-3 w-full'
				>
					Crear comentario
				</ActionButton>
			</div>
		</Modal>
	)
}
