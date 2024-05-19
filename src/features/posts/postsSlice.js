import { createSlice } from '@reduxjs/toolkit';
import { nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

const initialState = {
	posts: [],
	status: 'idle',
	error: null
};

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		postAdded: {
			reducer(state, action) {
				state.posts.push(action.payload)
			},
			prepare(title, content, userId) {
				return {
					payload: {
						id: nanoid(),
						date: new Date().toISOString(),
						title,
						body: content,
						user: userId,
						reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
					}
				}
			}
		},
		postUpdated(state, action) {
			const { id, title, body } = action.payload;
			const existingPost = state.posts.find(post => post.id == id);
			if (existingPost) {
				existingPost.title = title;
				existingPost.body = body;
			}
		},
		reactionAdded(state, action) {
			const { postId, reaction } = action.payload;
			const existingPost = state.posts.find(post => post.id === postId);
			if (existingPost) {
				existingPost.reactions[reaction]++;
			}
		}
	},
	extraReducers(builder) {
		builder
			.addCase(fetchPosts.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.posts = state.posts.concat(action.payload);
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});

			builder.addCase(addNewPost.fulfilled, (state, action) => {
				state.posts.push(action.payload)
			});
	}
});

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export const selectAllPosts = state => state.posts.posts;
export const selectPostById = (state, postId) =>
	state.posts.posts.find(post => post.id == postId);

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  return data;
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async initialPost => {
	const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
		method: 'POST',
		body: JSON.stringify({
			...initialPost
		}),
		headers: {
			'Content-type': 'application/json; charset=UTF-8'
		}
	});
	const data = await response.json();
	return data;
});

export default postsSlice.reducer;