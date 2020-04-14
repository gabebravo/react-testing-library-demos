import React from 'react';
import { render, within } from '@testing-library/react';
import PortalModal from '../PortalModal';

test('modal shows the children', () => {
  render(
    <PortalModal>
      <div data-testid="test" />
    </PortalModal>
  );
  const { getByTestId } = within(document.getElementById('modal-root'));
  expect(getByTestId('test')).toBeInTheDocument();
});
