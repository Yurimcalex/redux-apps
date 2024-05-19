import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor.jsx';
import { selectAllPosts, fetchPosts } from './postsSlice.js';
import { Spinner } from '../../components/Spinner.jsx';

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
	const error = useSelector(state => state.posts.error);

	useEffect(() => {
		if (postStatus === 'idle') {
			dispatch(fetchPosts());
			postStatus = '';
		}
	}, [postStatus, dispatch]);

	let content;
	if (postStatus === 'loading') {
		content = <Spinner text='Loading...' />;
	} else if (postStatus === 'succeeded') {
		content = posts.map(post => <PostExcerpt post={post} />);
	} else if (postStatus === 'failed') {
		content = <div>{error}</div>;
	}
	
	return (
		<section className='posts-list'>
			<h2>Posts</h2>
			{content}
		</section>
	);
};