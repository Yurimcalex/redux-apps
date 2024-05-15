import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
	name: 'counter',
	initialState: {
		value: 0
	},
	reducers: {
		increment: state => {
			state.value += 1
		},
		decrement: state => {
			state.value -= 1
		},
		incrementByAmount: (state, action) => {
			state.value += action.payload
		}
	}
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectCount = (state) => state.counter.value;

export const incrementAsync = (amount) => (dispatch) => {
	setTimeout(() => {
		dispatch(incrementByAmount(amount));
	}, 3000);
};

export default counterSlice.reducer;