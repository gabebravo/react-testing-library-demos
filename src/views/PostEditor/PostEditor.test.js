import React from 'react';
import PostEditor from '.';
import { render } from '@testing-library/react';

test('renders a form with title, content, tags, and a submit button', () => {
  const { getByLabelText, getByText, debug } = render(<PostEditor />);

  const title = getByLabelText(/title/i);
  const content = getByLabelText(/content/i);
  const tags = getByLabelText(/tags/i);
  const button = getByText(/submit/i);

  debug(title);
  debug(content);
  debug(tags);
  debug(button);
});
