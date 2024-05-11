import { createStore } from 'redux';

// constants
const TODO_ADDED = 'TODO_ADDED';
const TODO_TOGGLED = 'TODO_TOGGLED';
const TODO_COMPLETED_REMOVED = 'TODO_COMPLETED_REMOVED';

// actions
let id = 1;
export const addTodo = text => ({
	type: TODO_ADDED,
	payload: { text, id: id++ }
});

export const todoToggled = id => ({
	type: TODO_TOGGLED,
	payload: { id }
});

export const todosCompletedRemoved = () => ({
	type: TODO_COMPLETED_REMOVED
});

// reducers
export const todosReducer = (state = [], action) => {
	switch (action.type) {
		case TODO_ADDED:
			return state.concat({
				id: action.payload.id,
				text: action.payload.text,
				completed: false
			});
		case TODO_TOGGLED:
			return state.map(todo => {
				if (todo.id !== action.payload.id) return todo;
				return { ...todo, completed: !todo.completed };
			});
		case TODO_COMPLETED_REMOVED:
			return state.filter(todo => {
				if (!todo.completed) return todo;
			});
		default:
			return state;
	}
};

let store = createStore(todosReducer);

store.subscribe(() => console.log(store.getState()));

store.dispatch(addTodo('Learn Redux'));
store.dispatch(addTodo('Create redux app'));
store.dispatch(todoToggled(1));
store.dispatch(todosCompletedRemoved());