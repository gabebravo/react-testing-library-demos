import React from 'react';
import { render, act } from '@testing-library/react';
import CountUnmount from '.';

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

afterEach(() => {
  jest.clearAllMocks();
  jest.useRealTimers();
});

test('does not attempt to set state when unmounted (to prevent memory leaks)', () => {
  jest.useFakeTimers();
  const { unmount } = render(<CountUnmount />);
  unmount();
  act(() => jest.runOnlyPendingTimers());
  expect(console.error).not.toHaveBeenCalled();
});
