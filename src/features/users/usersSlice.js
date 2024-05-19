import { createSlice } from '@reduxjs/toolkit';

const initialState = [
	{ id: 0, name: 'Bob Hugo' },
	{ id: 1, name: 'Kiana Worth' },
	{ id: 2, name: 'Fridrich Bomm' }
];

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {}
});

export default usersSlice.reducer;