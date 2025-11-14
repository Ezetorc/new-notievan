import { useState } from 'react'
import { usePaginatedComments } from '../hooks/use-paginated-comments'
import { CommentDisplay } from './CommentDisplay'
import { CreateCommentModal } from './CreateCommentModal'
import { LoadMoreButton } from '../../../components/LoadMoreButton'
import { useSession } from '../../../hooks/use-session.hook'
import { useLocation } from 'wouter'

export function ArticleComments({ articleId }: { articleId: string }) {
	const { user } = useSession()
	const [, setLocation] = useLocation()
	const { comments, hasMore, loading, loadMore } = usePaginatedComments({
		articleId
	})
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	const handleCreateComment = () => {
		if (!user) {
			setLocation('/registro')

			return
		}

		setIsModalOpen(true)
	}

	return (
		<section className='my-9 w-full'>
			{isModalOpen && (
				<CreateCommentModal
					articleId={articleId}
					setIsModalOpen={setIsModalOpen}
				/>
			)}

			<button
				type='button'
				onClick={handleCreateComment}
				className='clickable w-full my-6 py-3 text-white font-bold text-2xl bg-brand-orange rounded-sm'
			>
				Comentar
			</button>

			<main className='flex flex-col gap-y-4'>
				{comments.map((comment) => (
					<CommentDisplay comment={comment} key={comment.id} />
				))}
			</main>

			{hasMore && (
				<LoadMoreButton loading={loading} onClick={loadMore}>
					Ver más
				</LoadMoreButton>
			)}
		</section>
	)
}
