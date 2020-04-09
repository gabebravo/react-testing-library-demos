import React from 'react';
import { render, act } from '@testing-library/react';
import { useCounter } from './useCounter';

test('exposes the count and increment/decrement functions', () => {
  let result;

  // this is required because you have to call a hook from within a functional component
  function TestComponent() {
    result = useCounter();
    return null;
  }

  // render the component and its initial 0 value
  render(<TestComponent />);
  expect(result.count).toBe(0);

  // increment assertion >> act is the helper for direclty calling the state updater in the hook
  act(() => result.increment());
  expect(result.count).toBe(1);

  // decrement assertion >> this is basically the only use case for calling act manually
  act(() => result.decrement());
  expect(result.count).toBe(0);
});

test('allows customization of the initial count', () => {
  const result = setup({ initialProps: { initialCount: 3 } });
  expect(result.current.count).toBe(3);
});

test('allows customization of the step', () => {
  const result = setup({ initialProps: { step: 2 } });
  expect(result.current.count).toBe(0);

  act(() => result.current.increment());
  expect(result.current.count).toBe(2);

  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});
