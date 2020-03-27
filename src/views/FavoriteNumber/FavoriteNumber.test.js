import React from 'react';
import ReactDOM from 'react-dom';
import { getQuereiesForElement } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import FavoriteNumber from '.';

// EXTEND JEST FOR BETTER ERROR FEEEDBACK AND CLEARER SYNTAX _______
test('fave num test using jest toHaveAttribute', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FavoriteNumber />, div); // render the component in the div
  // console.log('info: ', div.innerHTML)

  // more terse version doesnt use queries.getByLabelText or require container
  const { getByLabelText } = getQuereiesForElement(div);

  // RTL will search all children in the div above for a label with this text.
  // It will find the form control associated to that label and return that as our input.
  const input = getByLabelText(/favorite number/i); // regex ignoire case

  // toHaveAttribute (atribute, value)
  expect(input).toHaveAttribute('type', 'number');
});
