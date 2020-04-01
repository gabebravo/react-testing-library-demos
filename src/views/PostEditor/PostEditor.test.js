import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { savePost as mockSavePost } from '../../utils/api';
import PostEditor from '.';

// jest API mock
jest.mock('../../utils/api');

afterEach(() => {
  jest.clearAllMocks();
});

test('renders a form with title, content, tags, and a submit button', () => {
  // the actual mock api call - will return a promise that gets resolved
  mockSavePost.mockResolvedValueOnce(); // not mocking the reponse

  const fakeUser = { id: 'user-1' };
  const { getByLabelText, getByText } = render(<PostEditor user={fakeUser} />);
  const fakePost = {
    title: 'Test Title',
    content: 'Test content',
    tags: ['tag1', 'tag2']
  };

  // assigning values to the form inputs
  getByLabelText(/title/i).value = fakePost.title;
  getByLabelText(/content/i).value = fakePost.content;
  getByLabelText(/tags/i).value = fakePost.tags.join(',');

  const submitButton = getByText(/submit/i);

  fireEvent.click(submitButton); // click the button
  expect(submitButton).toBeDisabled(); // it should be disabled

  // assertion for the mock call using the value assigned above
  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    authorId: fakeUser.id
  });
  expect(mockSavePost).toHaveBeenCalledTimes(1);
});
