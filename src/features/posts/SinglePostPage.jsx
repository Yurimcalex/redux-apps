import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor.jsx';
import { TimeAgo } from './TimeAgo.jsx';
import { ReactionButtons } from './ReactionButtons.jsx';
import { selectPostById } from './postsSlice.js';

export const SinglePostPage = ({ match }) => {
	const { postId } = match.params;

	const post = useSelector(state => selectPostById(state, postId));

	if (!post) {
		return (
			<section>
				<h2>Post not found!</h2>
			</section>
		);
	}

	return (
		<section>
			<article className='post'>
				<h2>{post.title}</h2>
				<p className='post-content'>{post.content}</p>
				<PostAuthor userId={post.user} />
				<TimeAgo timestamp={post.date} />
				<ReactionButtons post={post} />
				<Link to={`/editPost/${post.id}`}>
					Edit Post
				</Link>
			</article>
		</section>
	);
};