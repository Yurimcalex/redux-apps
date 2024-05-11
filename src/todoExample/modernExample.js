import { createSlice, configureStore } from '@reduxjs/toolkit';

const todosSlice = createSlice({
	name: 'todos',
	initialState: [],
	reducers: {
		todoAdded(state, action) {
			state.push({
				id: action.payload.id,
				text: action.payload.text,
				completed: false
			});
		},
		todoToggled(state, action) {
			const todo = state.find(todo => todo.id === action.payload.id);
			todo.completed = !todo.completed;
		}
	}
});

export const { todoAdded, todoToggled } = todosSlice.actions;

let store = configureStore({
	reducer: {
		todos: todosSlice.reducer
	}
});

store.subscribe(() => console.log(store.getState()));

store.dispatch(todoAdded({
	id: 1,
	text: 'Task 1',
	completed: false
}));

store.dispatch(todoToggled({ id: 1 }));