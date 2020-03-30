import React from 'react';
import { render } from '@testing-library/react';
import 'jest-axe/extend-expect';
import { axe } from 'jest-axe';
import InaccessibleForm from './InaccessibleForm';
import AccessibleForm from './AccessibleForm';

test('inaccessible forms fail axe', async () => {
  const { container } = render(<InaccessibleForm />);
  // NOTE: I can't think of a situation where you'd want to test that some HTML
  // actually _does_ have accessibility issues... This is only here for
  // demonstration purposes.

  // simple way to create an instance of the result and log the violations
  const result = await axe(container);
  console.log('container violations', result.violations); // help: 'Form elements must have labels'

  // assertions tests whether there are no violations
  expect(await axe(container)).not.toHaveNoViolations();
});

// passing version
test('accessible forms pass axe', async () => {
  const { container } = render(<AccessibleForm />);
  expect(await axe(container)).toHaveNoViolations();
});
