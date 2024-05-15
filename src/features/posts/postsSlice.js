import { createSlice } from '@reduxjs/toolkit';

const initialState = [
	{ id: '1', title: 'First Post', content: 'Text text' },
	{ id: '2', title: 'Second Post', content: 'Another text' }
];

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {}
});

export default postsSlice.reducer;