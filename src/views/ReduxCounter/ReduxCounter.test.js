import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import ReduxCounter from '.';
import { store as appStore } from '../../redux/store';
import { reducer } from '../../redux/reducer';

test('can render with redux with defaults', () => {
  // renders the redux wrapped component
  const { getByLabelText, getByText } = render(
    <Provider store={appStore}>
      <ReduxCounter />
    </Provider>
  );

  // fires the click event to increment
  fireEvent.click(getByText('+')); // targets the button text
  // asserts the count is now 1
  expect(getByLabelText(/count/i)).toHaveTextContent('1'); // span has an aria-label
});

// test('can render with redux with custom initial state', () => {
//   // using createStore to set initial state;
//   const store = createStore(reducer, { count: 3 });
//   // renders the redux wrapped component with store instance that has default state
//   const { getByLabelText, getByText, debug } = render(
//     <Provider store={store}>
//       <ReduxCounter />
//     </Provider>
//   );

//   // fires the click event to decrement
//   fireEvent.click(getByText('-')); // targets the button text
//   // asserts the count is now 2, based on initial state being 3
//   expect(getByLabelText(/count/i)).toHaveTextContent('2'); // span has an aria-label
// });
