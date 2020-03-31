import React from 'react';
import { render } from '@testing-library/react';
import { reportError as mockReportError } from '../../utils/api';
import ErrorBoundary from '.';

jest.mock('../../utils/api');

afterEach(() => {
  jest.clearAllMocks();
});

function Bomb({ shouldThrow }) {
  if (shouldThrow) {
    throw new Error('💣');
  } else {
    return null;
  }
}

test('calls reportError and renders that there was a problem', () => {
  // first time the success is true, so simulates no error
  mockReportError.mockResolvedValueOnce({ success: true });

  const { rerender } = render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>
  );

  // this rerender will rerender the component with the bomb
  rerender(
    <ErrorBoundary>
      <Bomb shouldThrow={true} />
    </ErrorBoundary>
  );

  const error = expect.any(Error);
  const info = { componentStack: expect.stringContaining('Bomb') };
  // assertions
  expect(mockReportError).toHaveBeenCalledWith(error, info);
  expect(mockReportError).toHaveBeenCalledTimes(1);
});

// this is only here to make the error output not appear in the project's output
// even though in the course we don't include this bit and leave it in it's incomplete state.
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
});

/*
eslint
  jest/prefer-hooks-on-top: off
*/
