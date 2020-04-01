import React from 'react';
import PostEditor from '.';
import { render, fireEvent } from '@testing-library/react';

test('renders a form with title, content, tags, and a submit button', () => {
  const { getByLabelText, getByText, debug } = render(<PostEditor />);

  const title = getByLabelText(/title/i);
  const content = getByLabelText(/content/i);
  const tags = getByLabelText(/tags/i);
  const submitButton = getByText(/submit/i);
  debug(submitButton); // will show the HTML of the button

  fireEvent.click(submitButton); // click the button
  expect(submitButton).toBeDisabled(); // it should be disabled
});
