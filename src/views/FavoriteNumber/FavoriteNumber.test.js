import React from 'react';
import user from '@testing-library/user-event';
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

// ALT VERSION USING USER FROM RTL ______________________________
test('alt version using the user type method from RTL User', () => {
  const { getByLabelText, getByRole } = render(<FavoriteNumber />);
  const input = getByLabelText(/favorite number/i);

  // the user here is simulating typing out the keys and pressing the number 1 and 0.
  user.type(input, '10');

  expect(getByRole('alert')).toHaveTextContent(/the number is invalid/i);
});

// TEST VARIATION USING THE RERENDER METHOD ______________________
test('test variation using the rerender method', () => {
  const { getByLabelText, getByRole, rerender, debug } = render(
    <FavoriteNumber />
  );
  const input = getByLabelText(/favorite number/i);

  // the user here is simulating typing out the keys and pressing the number 1 and 0.
  user.type(input, '10');
  expect(getByRole('alert')).toHaveTextContent(/the number is invalid/i);

  // if you need to re-render that same component with new props,
  // you simply use the re-render method that you get back from render.
  debug();
  rerender(<FavoriteNumber max={10} />);
  debug();
});
