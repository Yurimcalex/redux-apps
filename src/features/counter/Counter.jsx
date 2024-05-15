import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
	increment,
	decrement,
	incrementByAmount,
	selectCount,
	incrementAsync
} from './counterSlice.js';
import styles from './Counter.module.css';

export function Counter() {
	const count = useSelector(selectCount);
	const dispatch = useDispatch();
	const [incrementAmount, setIncrementAmount] = useState(2);

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
				<input type="text"
					aria-label="Set increment amount"
				 	value={incrementAmount}
				 	onChange={(e) => setIncrementAmount(+e.target.value)} 
				/>
				<button 
					onClick={() => dispatch(incrementByAmount(incrementAmount))}
				>
					Add amount
				</button>
				<button
					onClick={() => dispatch(incrementAsync(incrementAmount))}
				>
					Increment Async
				</button>
			</div>
		</div>
	);
} 