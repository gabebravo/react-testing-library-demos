import React from 'react';
import ReactDOM from 'react-dom';
import { getQuereiesForElement } from '@testing-library/dom';
import FavoriteNumber from '.';

// REFACTOR __________________________________

// DRY - can reuse for any React DOM testing instance
function render(ui) {
  const container = document.createElement('div');
  ReactDOM.render(ui, container); // wraps ui in container
  const queries = getQuereiesForElement(container); // gets all query methods
  return { container, ...queries }; // return container and methods
}

test('renders a number input with a label "Favorite Number"', () => {
  const { getByLabelText } = render(<FavoriteNumber />); // getting a query method
  const input = getByLabelText(/favorite number/i); // regex ignore case
  // toHaveAttribute (atribute, value)
  expect(input).toHaveAttribute('type', 'number');
});
