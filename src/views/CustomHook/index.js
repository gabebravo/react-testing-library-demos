import React from 'react';
import { useCounter } from './useCounter';

export default function CustomHook() {
  const { count, increment, decrement } = useCounter();
  return (
    <div className="container">
      <div>{count}</div>
      <div>
        <button onClick={increment}>Inc</button>
      </div>
      <div>
        <button onClick={decrement}>Dec</button>
      </div>
    </div>
  );
}
