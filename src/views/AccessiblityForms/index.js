import React from 'react';
import InaccessibleForm from './InaccessibleForm';
import AccessibleForm from './AccessibleForm';

export default function AccessiblityForms() {
  return (
    <div className="container">
      <InaccessibleForm />
      <AccessibleForm />
    </div>
  );
}
