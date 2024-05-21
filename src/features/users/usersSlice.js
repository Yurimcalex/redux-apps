import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchUsers.fulfilled, usersAdapter.setAll);
	}
});

export const {
	selectAll: selectAllUsers,
	selectById: selectUserById
} = usersAdapter.getSelectors(state => state.users);

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/users');
	const data = await response.json();
	return data;
});

export default usersSlice.reducer;