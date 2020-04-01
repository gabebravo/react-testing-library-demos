import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 18%;
  margin: auto;
`;

export default function Editor() {
  const [isSaving, setIsSaving] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsSaving(true);
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label aria-label="Info for reader here" htmlFor="title-input">
        Title
      </label>
      <input id="title-input" />

      <label htmlFor="content-input">Content</label>
      <textarea id="content-input" />

      <label htmlFor="tags-input">Tags</label>
      <input id="tags-input" />

      <button aria-label="Woooooo hooooo!!!" type="submit" disabled={isSaving}>
        Submit
      </button>
    </StyledForm>
  );
}
