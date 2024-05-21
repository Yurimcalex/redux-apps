import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { nanoid, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

const postsAdapter = createEntityAdapter({
	sortComparer: (a, b) => b.title.localeCompare(a.title)
});

const initialState = postsAdapter.getInitialState({
	status: 'idle',
	error: null
});

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		postUpdated(state, action) {
			const { id, title, body } = action.payload;
			const existingPost = state.entities[id];
			if (existingPost) {
				existingPost.title = title;
				existingPost.body = body;
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
				postsAdapter.upsertMany(state, action.payload);
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});

			builder.addCase(addNewPost.fulfilled, postsAdapter.addOne);
	}
});

export const { postUpdated } = postsSlice.actions;

export const {
	selectAll: selectAllPosts,
	selectById: selectPostById,
	selectIds: selectPostIds
} = postsAdapter.getSelectors(state => state.posts);

export const selectPostsByUser = createSelector(
	[
		selectAllPosts,
		(state, userId) => userId
	],
	(posts, useId) => posts.filter(post => post.userId == useId)
);

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