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

// resuable function to share code between tests
function renderEditor() {
  const fakeUser = userBuilder();
  const utils = render(<PostEditor user={fakeUser} />);
  const fakePost = postBuilder();
  // console.log('fakePost', { ...fakeUser, ...fakePost });

  // assigns values to the form inputs
  utils.getByLabelText(/title/i).value = fakePost.title;
  utils.getByLabelText(/content/i).value = fakePost.content;
  utils.getByLabelText(/tags/i).value = fakePost.tags.join(', ');
  const submitButton = utils.getByText(/submit/i);
  return {
    ...utils,
    submitButton,
    fakeUser,
    fakePost
  };
}

test('renders a form with title, content, tags, and a submit button', async () => {
  // the actual mock api call - will return a promise that gets resolved
  mockSavePost.mockResolvedValueOnce(); // not mocking the reponse

  // shared render function
  const { submitButton, fakePost, fakeUser } = renderEditor();
  const preDate = new Date().getTime();

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
});

// THIS IS THE CONDITION THAT THE SAVE API CALL FAILS
test('renders an error message from the server', async () => {
  const TEST_ERROR = 'test error';
  mockSavePost.mockRejectedValueOnce({
    data: { error: TEST_ERROR }
  }); // mocking the rejected reponse

  // shared render function
  const { submitButton, findByRole } = renderEditor();
  fireEvent.click(submitButton); // click the button

  // findBy query are async, so they will keep trying and waiting until they timeout
  const postError = await findByRole('alert');
  expect(postError).toHaveTextContent(TEST_ERROR);
  expect(submitButton).not.toBeDisabled();
});
