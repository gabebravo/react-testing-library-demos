import React from 'react';
import { render } from '@testing-library/react';
import FavoriteNumber from '.';

test('renders a number input with a label "Favorite Number"', () => {
  const { getByLabelText } = render(<FavoriteNumber />); // getting a query method from render method
  const input = getByLabelText(/favorite number/i); // regex ignore case
  expect(input).toHaveAttribute('type', 'number'); // toHaveAttribute (atribute, value)
});
