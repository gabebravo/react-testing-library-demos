import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import Home from '.';

test('renders home and navigates to favorite numbers page', () => {
  // creates own instance of history for testing purposes - root route is Home
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const { getByRole, getByText, getByTestId, getByLabelText, debug } = render(
    // Router is needed to wrap the component when routing links
    <Router history={history}>
      <Home />
    </Router>
  );

  // the Favorite Number icon
  const faveNumIcon = getByTestId(/favorite/i);

  // assert we're on the homepage = role is heading for the h3 that has the text "React Testing Library Demos"
  expect(getByRole('heading')).toHaveTextContent(/demos/i);

  // click event on link to go to the favorite number page
  fireEvent.click(faveNumIcon); // pushes the route path to history

  // get the last pathname
  const pathname = history.entries[history.entries.length - 1].pathname;
  expect(pathname).toMatch(/favorite/i); // assert its a match
});

test('renders home and navigates to accessibility forms page', () => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const { getByRole, getByTestId } = render(
    <Router history={history}>
      <Home />
    </Router>
  );

  const accFormLink = getByTestId(/accessibility/i);
  expect(getByRole('heading')).toHaveTextContent(/demos/i);

  fireEvent.click(accFormLink);

  const pathname = history.entries[history.entries.length - 1].pathname;
  expect(pathname).toMatch(/accessibility/i); // assert its a match
});

// const greetLoaderLink = getByText(/loader/i);
// const hiddenMessLink = getByText(/message/i);
// const postEditorLink = getByText(/editor/i);
