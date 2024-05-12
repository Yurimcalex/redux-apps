import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './counterSlice.js';
import styles from './Counter.module.css';

export function Counter() {
	const count = useSelector(state => state.counter.value);
	const dispatch = useDispatch();



	return (
		<div className={styles.counter}>
			<div>
				<button
					aria-label='Increment value'
					onClick={() => dispatch(increment())}
				>
					Increment
				</button>
				<span>{count}</span>
				<button
					aria-label='Decrement value'
					onClick={() => dispatch(decrement())}
				>
					Decrement
				</button>
			</div>
		</div>
	);
} 