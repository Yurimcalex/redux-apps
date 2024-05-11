import { createStore } from 'redux';

// constants
const TODO_ADDED = 'TODO_ADDED';
const TODO_TOGGLED = 'TODO_TOGGLED';

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
		default:
			return state;
	}
};

let store = createStore(todosReducer);

store.subscribe(() => console.log(store.getState()));

store.dispatch(addTodo('Learn Redux'));
store.dispatch(addTodo('Create redux app'));
store.dispatch(todoToggled(1));