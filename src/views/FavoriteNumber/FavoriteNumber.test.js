import React from 'react';
import { render } from '@testing-library/react';
import FavoriteNumber from '.';

test('renders a number input with a label "Favorite Number"', () => {
  const { getByLabelText, debug } = render(<FavoriteNumber />); // getting a query method from render method
  const input = getByLabelText(/favorite number/i); // regex ignore case
  debug(input); // will print out the container we are rendering
  expect(input).toHaveAttribute('type', 'number'); // toHaveAttribute (atribute, value)
});
