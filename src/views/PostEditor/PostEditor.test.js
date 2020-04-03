import React from 'react';
import { Redirect as MockRedirect } from 'react-router-dom';
import { render, fireEvent, wait } from '@testing-library/react';
import { build, fake, sequence } from 'test-data-bot';
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

// func using test-data-bot to build Post mock data objcets
const postBuilder = build('Post').fields({
  title: fake(f => f.lorem.words()),
  content: fake(f => f.lorem.paragraphs().replace(/\r/g, '')), // fix weird faker formatting
  tags: fake(f => [f.lorem.words(), f.lorem.words(), f.lorem.words()])
});

// func using test-data-bot to build User mock data objcets
const userBuilder = build('User').fields({
  id: sequence(s => `user-${s}`)
});

test('renders a form with title, content, tags, and a submit button', async () => {
  // the actual mock api call - will return a promise that gets resolved
  mockSavePost.mockResolvedValueOnce(); // not mocking the reponse

  const fakeUser = userBuilder();
  const { getByLabelText, getByText } = render(<PostEditor user={fakeUser} />);
  const fakePost = postBuilder();
  // console.log('fakePost', { ...fakeUser, ...fakePost });
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
  // assertion to verify the date
  expect(date).toBeGreaterThanOrEqual(preDate);
  expect(date).toBeLessThanOrEqual(postDate);

  // React Router redirect assertion >> requires async wait fn from RTL
  await wait(() => expect(MockRedirect).toHaveBeenCalledWith({ to: '/' }, {}));

  // better not to have toHaveBeenCalledTimes assertion on mocked call >>
  // NOPE :expect(MockRedirect).toHaveBeenCalledTimes(1);
});

test('renders an error message from the server', async () => {
  mockSavePost.mockRejectedValueOnce({
    data: { error: 'test error' }
  }); // mocking the rejected reponse

  const fakeUser = userBuilder();
  const { getByLabelText, getByText, findByRole } = render(
    <PostEditor user={fakeUser} />
  );
  const fakePost = postBuilder();

  // assigning values to the form inputs
  getByLabelText(/title/i).value = fakePost.title;
  getByLabelText(/content/i).value = fakePost.content;
  getByLabelText(/tags/i).value = fakePost.tags.join(',');

  const submitButton = getByText(/submit/i);
  fireEvent.click(submitButton); // click the button

  // findBy query are async, so they will keep trying and waiting until they timeout
  const postError = await findByRole('alert');
  expect(postError).toHaveTextContent('test error');
  expect(submitButton).not.toBeDisabled();
});
