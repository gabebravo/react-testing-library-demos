import React from 'react';
import { Redirect as MockRedirect } from 'react-router-dom';
import { render, fireEvent, wait } from '@testing-library/react';
import { savePost as mockSavePost } from '../../utils/api';
import PostEditor from '.';

// mock react router redirect
jest.mock('react-router', () => {
  return {
    // fest func serves for running assertion
    Redirect: jest.fn(() => null)
  };
});

// jest API mock
jest.mock('../../utils/api');

afterEach(() => {
  jest.clearAllMocks();
});

test('renders a form with title, content, tags, and a submit button', async () => {
  // the actual mock api call - will return a promise that gets resolved
  mockSavePost.mockResolvedValueOnce(); // not mocking the reponse

  const fakeUser = { id: 'user-1' };
  const { getByLabelText, getByText } = render(<PostEditor user={fakeUser} />);
  const fakePost = {
    title: 'Test Title',
    content: 'Test content',
    tags: ['tag1', 'tag2']
  };
  const preDate = new Date().getTime(); // start date/time for assertion

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
    date: expect.any(String),
    authorId: fakeUser.id
  });
  expect(mockSavePost).toHaveBeenCalledTimes(1);

  const postDate = new Date().getTime(); // end date/time for assertion
  const date = new Date(mockSavePost.mock.calls[0][0].date).getTime();
  console.log('mock date', date);
  // assertion to verify the date
  expect(date).toBeGreaterThanOrEqual(preDate);
  expect(date).toBeLessThanOrEqual(postDate);

  // React Router redirect assertion >> requires async wait fn from RTL
  await wait(() => expect(MockRedirect).toHaveBeenCalledWith({ to: '/' }, {}));

  // better not to have toHaveBeenCalledTimes assertion on mocked call >>
  // NOPE :expect(MockRedirect).toHaveBeenCalledTimes(1);
});
