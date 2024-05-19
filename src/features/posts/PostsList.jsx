import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor.jsx';
import { selectAllPosts, fetchPosts } from './postsSlice.js';

const PostExcerpt = ({ post }) => {
	return (
		<article className='post-excerpt' key={post.id}>
			<h3>{post.title}</h3>
			<p className='post-content'>{post.body.substring(0, 100)}</p>
			<PostAuthor userId={post.userId} />
			<Link to={`/posts/${post.id}`} className='button muted-button'>
				View Post
			</Link>
		</article>
	);
};

export const PostsList = () => {
	const dispatch = useDispatch();
	const posts = useSelector(selectAllPosts);
	let postStatus = useSelector(state => state.posts.status);

	useEffect(() => {
		if (postStatus === 'idle') {
			dispatch(fetchPosts());
			postStatus = '';
		}
	}, [postStatus, dispatch]);

	const renderedPosts = posts.map(post => 
		<PostExcerpt post={post} />);

	return (
		<section className='posts-list'>
			<h2>Posts</h2>
			{renderedPosts}
		</section>
	);
};