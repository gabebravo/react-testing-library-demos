import React from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from '../../redux/store';

function Counter() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();

  const increment = () => dispatch({ type: 'INCREMENT' });
  const decrement = () => dispatch({ type: 'DECREMENT' });

  return (
    <div className="container">
      <h2>Counter</h2>
      <div className="row">
        <span style={{ fontSize: '2rem' }} aria-label="count">
          {count}
        </span>
      </div>
      <div className="row">
        <button style={{ marginRight: 10 }} onClick={decrement}>
          -
        </button>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
}

function ReduxCounter() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

export default ReduxCounter;
