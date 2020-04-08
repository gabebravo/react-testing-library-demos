import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import ReduxCounter from '.';
import { store } from '../../redux/store';

test('can render with redux with defaults', () => {
  // renders the redux wrapped component
  const { getByLabelText, getByText } = render(
    <Provider store={store}>
      <ReduxCounter />
    </Provider>
  );

  // fires the click event to increment
  fireEvent.click(getByText('+')); // targets the button text
  // asserts the count is now 1
  expect(getByLabelText(/count/i)).toHaveTextContent('1'); // span has an aria-label
});
