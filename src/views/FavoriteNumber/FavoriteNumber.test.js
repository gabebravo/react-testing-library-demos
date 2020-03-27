import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FavoriteNumber from '.';

// DEBUGGING EXAMPLE ______________________________
test('renders a number input with a label "Favorite Number"', () => {
  const { getByLabelText, debug } = render(<FavoriteNumber />); // getting a query method from render method
  const input = getByLabelText(/favorite number/i); // regex ignore case
  // debug(input); // will print out the container we are rendering
  expect(input).toHaveAttribute('type', 'number'); // toHaveAttribute (atribute, value)
});

// FIRING EVENTS WITH RTL ______________________________
test('entering an invalid value shows an error message', () => {
  const { getByLabelText, getByRole } = render(<FavoriteNumber />);
  const input = getByLabelText(/favorite number/i);

  // this will take the input, which is the target, and apply all of the properties we've specified.
  // So now the input is going to have a value of 10.
  fireEvent.change(input, { target: { value: '10' } });

  expect(getByRole('alert')).toHaveTextContent(/the number is invalid/i);
});
