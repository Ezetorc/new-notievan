import { useLocation } from 'wouter'
import { ArticleInput } from '../../../components/ArticleInput'
import { MarkdownEditor } from '../../../components/MarkdownEditor'
import { DesktopOnlyMessage } from '../../../components/DesktopOnlyMessage'
import { ErrorMessage } from '../../../components/ErrorMessage'
import { ImageInput } from '../../../components/ImageInput'
import { useForm } from '../../../hooks/use-form.hook'
import {
	EditArticleSchema,
	type EditArticleFormData
} from '../models/edit-article-form-data.model'
import { useArticle } from '../../../hooks/use-article.hook'
import NotFoundPage from '../../NotFoundPage'
import { ArticlesService } from '../../../services/articles.service'
import { getFormDataFrom } from '../../../utilities/get-form-data-from.utility'
import { Loading } from '../../../components/Loading'
import { useQueryClient } from '@tanstack/react-query'
import { ActionButton } from '../../../components/ActionButton'
import { useState } from 'react'

export default function EditArticlePage({ id }: { id: string }) {
	const { article, isLoading, isError } = useArticle(id)
	const [, setLocation] = useLocation()
	const [isEditing, setIsEditing] = useState(false)
	const queryClient = useQueryClient()

	const onSuccess = async (data: EditArticleFormData) => {
		setIsEditing(true)
		const formData = getFormDataFrom(data)
		await ArticlesService.update(formData, id)

		queryClient.invalidateQueries({ queryKey: ['article', id] })
		queryClient.invalidateQueries({
			predicate: (q) =>
				Array.isArray(q.queryKey) && q.queryKey[0] === 'articles'
		})

		setLocation(`/articulos/${id}`)
	}

	const { error, onSubmit, watch } = useForm(onSuccess, EditArticleSchema, {
		image: article?.image || '',
		content: article?.content || '',
		description: article?.description || '',
		title: article?.title || '',
		subtitle: article?.subtitle || ''
	})

	if (isLoading) return <Loading />

	if (isError || !article) return <NotFoundPage />

	return (
		<>
			<DesktopOnlyMessage message='No puedes crear artículos desde el celular.' />

			<form className='hidden md:flex flex-col pb-[5vw] mt-[60px]'>
				<ArticleInput
					placeholder='Subtítulo de tu artículo...'
					minLength={1}
					maxLength={50}
					className='text-2xl font-bold font-text mb-5'
					onChange={(value) => watch('subtitle', value)}
					defaultValue={article.subtitle}
				/>

				<ArticleInput
					placeholder='Título de tu artículo...'
					minLength={1}
					maxLength={50}
					className='text-5xl'
					onChange={(value) => watch('title', value)}
					defaultValue={article.title}
				/>

				<ArticleInput
					className='mt-5 text-2xl mb-[30px]'
					placeholder='Descripción de tu artículo...'
					minLength={1}
					maxLength={50}
					onChange={(value) => watch('description', value)}
					defaultValue={article.description}
				/>

				<div className='grid gap-x-10 w-full grid-cols-[2fr_1fr]'>
					<div className='flex max-w-[800px] flex-col justify-between gap-y-6'>
						<MarkdownEditor
							onChange={(value) => watch('content', value)}
							placeholder='Contenido de tu artículo...'
							value={article.content}
						/>

						<ActionButton
							className='w-full bg-brand-orange text-white font-bold text-3xl h-[70px]'
							loading={isEditing}
							onClick={onSubmit}
						>
							Editar artículo
						</ActionButton>
					</div>

					<aside className='flex flex-col gap-y-5'>
						<ImageInput
							onImageSelected={(value) => watch('image', value)}
							value={article.image}
						/>
					</aside>
				</div>

				{error && <ErrorMessage>{error}</ErrorMessage>}
			</form>
		</>
	)
}
