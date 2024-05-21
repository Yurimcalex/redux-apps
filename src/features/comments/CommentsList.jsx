import React, {useLayoutEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatDistanceToNow, parseISO } from 'date-fns';
import classnames from 'classnames';
import { selectAllPosts } from '../posts/postsSlice.js';
import { selectAllComments, allCommentsRead } from './commentsSlice.js';


export const CommentsList = () => {
	const dispatch = useDispatch();
	const comments = useSelector(selectAllComments);
	const posts = useSelector(selectAllPosts);

	useLayoutEffect(() => {
		dispatch(allCommentsRead());
	});

	const renderedComments = comments.map(comment => {
		const date = parseISO(comment.date);
		const timeAgo = formatDistanceToNow(date);
		const post = posts.find(post => post.id == comment.postId);

		const commentsClassname = classnames('notification', {
			new: comment.isNew
		});

		return (
			<div key={comment.postId} className={commentsClassname}>
				<div>
					<h3>{post.title}</h3><br/>
					<em>{post.body}</em>
				</div>
				<div title={comment.date}>
					<h4>Comments, <i>{timeAgo} ago</i>:</h4>
					<div>
						{comment.data.map(entrie => {
							return (
								<div key={entrie.id}>
									<h5><i>{entrie.email}</i></h5>
									<div>{entrie.body}</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	});

	return (
		<section className='notificationsList'>
			<h2>Comments</h2>
			{renderedComments}
		</section>
	);
};