import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { loadGreeting as mockLoadGreeting } from '../../utils/api';
import GreetingLoader from '.';

// jest.mock will import the async calls and create mocked versions for testing
jest.mock('../../utils/api');

test('loads greetings on click', async () => {
  const testGreeting = 'TEST_GREETING';
  // this is the jest call mocking
  mockLoadGreeting.mockResolvedValueOnce({ data: { greeting: testGreeting } });

  const { getByLabelText, getByText, debug } = render(<GreetingLoader />);
  // IMPORTANT QUERY SELECTORS TO TARGET ELEMENTS
  const nameInput = getByLabelText(/name/i); // attribute htmlFor
  const loadButton = getByText(/load/i); // button text
  const greeting = getByLabelText(/greeting/i); // attribute aria-label

  nameInput.value = 'Mary';
  fireEvent.click(loadButton);

  debug(); // here the <div> is empty because it hasnt finished the call to render

  expect(mockLoadGreeting).toHaveBeenCalledWith('Mary');
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1);

  await wait(() => {
    debug(); // here the <div> will have TEST_GREETING within it
    // console.log('greeting', greeting); // '__reactEventHandlers': { 'aria-label': 'greeting', children: 'TEST_GREETING' },
    expect(greeting).toHaveTextContent(testGreeting);
  });

  // EXTRA INFO ___________________________________
  const alMessage = getByLabelText(/yay/i); // this will find a label element or aria-label
  debug(alMessage); // this is the second static div
  // console.log('alMessage', alMessage); // this is the HTMLDiVElement
});
