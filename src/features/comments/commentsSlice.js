import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { selectAllPosts } from '../posts/postsSlice.js';

const commentsSlice = createSlice({
	name: 'comments',
	initialState: [],
	reducers: {},
	extraReducers(builder) {
		builder.addCase(fetchComments.fulfilled, (state, action) => {
			state.push(action.payload);
			state.sort((a, b) => b.date.localeCompare(a.date));
		});
	}
});

export const selectAllComments = state => state.comments;

export const fetchComments = createAsyncThunk(
	'comments/fetchComments',
	async (_, { getState }) => {
		const allComments = selectAllComments(getState());
		const fetchedPostsCommentsIds = allComments.map(c => c.postId);
		const postsCount = selectAllPosts(getState()).length;
		let postId = -1;

		while (true) {
			postId = randomInteger(1, postsCount);
			if (!fetchedPostsCommentsIds.includes(postId)) {
				break;
			}
		}

		const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
		const data = await response.json();
		return {
			data,
			postId,
			date: new Date().toISOString(),
		};
	}
);

export default commentsSlice.reducer;


function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}