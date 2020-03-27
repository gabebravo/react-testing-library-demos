import React from 'react';
import ReactDOM from 'react-dom';
import { queries } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import FavoriteNumber from '.';

// EXTEND JEST FOR BETTER ERROR FEEEDBACK AND CLEARER SYNTAX _______
test('fave num test using jest toHaveAttribute', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FavoriteNumber />, div); // render the component in the div
  // console.log('info: ', div.innerHTML) 

  // RTL will search all children in this div for a label with this text.
  // Then it will find the form control associated to that label and return that as our input.
  const input = queries.getByLabelText(div, 'Favorite Number');

  // toHaveAttribute (atribute, value)
  expect(input).toHaveAttribute('type', 'number');
});
