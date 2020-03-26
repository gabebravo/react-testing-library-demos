import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import FavoriteNumber from '../views/FavoriteNumber';

// EXTEND JEST FOR BETTER ERROR FEEEDBACK AND CLEARER SYNTAX _______
test('fave num test using jest toHaveAttribute', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FavoriteNumber />, div);
  // console.log('info: ', div.innerHTML)

  expect(div.querySelector('input')).toHaveAttribute('type', 'number');
  expect(div.querySelector('label')).toHaveTextContent('Favorite Number');
});
