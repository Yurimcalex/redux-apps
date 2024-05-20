import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = [
	{ id: 0, name: 'Bob Hugo' },
	{ id: 1, name: 'Kiana Worth' },
	{ id: 2, name: 'Fridrich Bomm' }
];

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchUsers.fulfilled, (state, action) => {
				return action.payload;
			});
	}
});

export const selectAllUsers = state => state.users;
export const selectUserById = (state, userId) =>
	state.users.find(user => user.id == userId);

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/users');
	const data = await response.json();
	return data;
});

export default usersSlice.reducer;