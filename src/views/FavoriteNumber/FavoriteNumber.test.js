import React from 'react';
import { render } from '@testing-library/react';
import FavoriteNumber from '.';

// THIS IS HOW TO DEBUG
test('renders a number input with a label "Favorite Number"', () => {
  const { getByLabelText, debug } = render(<FavoriteNumber />); // getting a query method from render method
  debug(); // will print out the container we are rendering
  const input = getByLabelText(/favorite number/i); // regex ignore case
  expect(input).toHaveAttribute('type', 'number'); // toHaveAttribute (atribute, value)
});

// YOU CAN DEBUG AT DIFFERENT TIMES IN THE CODE BLOCK - AFTER
test('renders a number input with a label "Favorite Number"', () => {
  const { getByLabelText, debug } = render(<FavoriteNumber />); // getting a query method from render method
  const input = getByLabelText(/favorite number/i); // regex ignore case
  expect(input).toHaveAttribute('type', 'number'); // toHaveAttribute (atribute, value)
  debug(); // will print out the container we are rendering
});

// YOU CAN DEBUG SPECIFIC ELMENTS IN THE DOM
test('renders a number input with a label "Favorite Number"', () => {
  const { getByLabelText, debug } = render(<FavoriteNumber />); // getting a query method from render method
  const input = getByLabelText(/favorite number/i); // regex ignore case
  debug(input); // will print out the container we are rendering
  expect(input).toHaveAttribute('type', 'number'); // toHaveAttribute (atribute, value)
});
