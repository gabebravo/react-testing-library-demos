import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import HiddenMessage from '.';

jest.mock('react-transition-group', () => {
  return {
    CSSTransition: props => (props.in ? props.children : null)
  };
});

test('shows hidden message when toggle is clicked', async () => {
  const myMessage = 'This is a secret message!';
  const { getByText, queryByText, debug } = render(<HiddenMessage />);

  const toggleButton = getByText(/toggle/i); // this is the button
  const wrapperDiv = queryByText(/wrapper-div/i);

  // it's not there
  debug(wrapperDiv);
  expect(queryByText(myMessage)).not.toBeInTheDocument();

  // we click it, and it is there
  fireEvent.click(toggleButton);
  debug(wrapperDiv);
  await wait(() => expect(getByText(myMessage)).toBeInTheDocument());

  // we click it one more time, and it is not there
  fireEvent.click(toggleButton);
  debug(wrapperDiv);
  await wait(() => expect(queryByText(myMessage)).not.toBeInTheDocument());
});
