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

// _____________________________ REDUX WRAPPER UTIL FOR REPETATIVE TESTS

// this is a handy function that I normally make available for all my tests
// that deal with connected components.
// you can provide initialState or the entire store that the ui is rendered with
// function render(
//   ui,
//   {
//     initialState,
//     store = createStore(reducer, initialState),
//     ...renderOptions
//   } = {}
// ) {
//   function Wrapper({ children }) {
//     return <Provider store={store}>{children}</Provider>;
//   }
//   return {
//     ...rtlRender(ui, {
//       wrapper: Wrapper,
//       ...renderOptions
//     }),
//     // adding `store` to the returned utilities to allow us
//     // to reference it in our tests (just try to avoid using
//     // this to test implementation details).
//     store
//   };
// }

// test('can increment the value', () => {
//   const { getByLabelText, getByText } = render(<ReduxCounter />);
//   fireEvent.click(getByText('+'));
//   expect(getByLabelText(/count/i)).toHaveTextContent('1');
// });

// test('can decrement the value', () => {
//   const { getByLabelText, getByText } = render(<ReduxCounter />, {
//     initialState: { count: 3 }
//   });
//   fireEvent.click(getByText('-'));
//   expect(getByLabelText(/count/i)).toHaveTextContent('2');
// });
