import { renderHook, act } from '@testing-library/react-hooks';
import { useCounter } from './useCounter';

// ALL THESE VERSIONS USE renderHook util from RTL react-hooks : npmjs.com/package/@testing-library/react-hooks
test('v2 - exposes the count and increment/decrement functions', () => {
  const { result } = renderHook(useCounter);
  expect(result.current.count).toBe(0);

  act(() => result.current.increment());
  expect(result.current.count).toBe(1);

  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});

// HOW DOES renderHook WORK ???
// It takes 2 params: 1) the hook itself; 2) an object with some initial props
//  EXAMPLE OF THE OBJECT RETURNED FROM renderHook
// {
//   result: { current: [Getter], error: [Getter] },
//   rerender: [Function: rerender],
//   unmount: [Function: unmountHook],
//   wait: [Function: wait],
//   waitForNextUpdate: [Function: waitForNextUpdate],
//   waitForValueToChange: [Function: waitForValueToChange]
// }

test('v2 - allows customization of the initial count', () => {
  const { result } = renderHook(useCounter, {
    initialProps: { initialCount: 3 }
  });
  expect(result.current.count).toBe(3);
});

// THE COMMENT ABOVE EXPLAINS { result } && result.current.count
test('v2 - allows customization of the step', () => {
  const { result } = renderHook(useCounter, { initialProps: { step: 2 } });
  expect(result.current.count).toBe(0);

  act(() => result.current.increment());
  expect(result.current.count).toBe(2);

  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});
