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

// TEST VARIATION USING THE RERENDER METHOD ______________________
test('test variation with updating max prop to 10', () => {
  const { getByLabelText, getByRole, rerender, queryByRole, debug } = render(
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

  // this wont work with getByRole needs to be queryByRole
  // If you want to verify an element is not being rendered, then you're going to use a query that is prefixed with 'query' (queryByRole) rather than one that is prefixed with 'get' (getByRole).
  expect(queryByRole('alert')).toBeNull();

  // the reason is because the role doesnt exist because the div with the alert isnt rendering
  // here is the logic : {isValid ? null : <div role="alert">The number is invalid</div>}
  // so queryByRole will do the query, not find it, and thus confirm it is null
});
