import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './counterSlice.js';

export default function Counter() {
	const count = useSelector(state => state.counter.value);
	const dispatch = useDispatch();

	return (
		<div>
			<div>
				<button
					aria-label='Increment value'
					onClick={() => useDispatch(increment())}
				>
					Increment
				</button>
				<span>{count}</span>
				<button
					aria-label='Decrement value'
					onClick={() => useDispatch(decrement())}
				>
					Decrement
				</button>
			</div>
		</div>
	);
} 