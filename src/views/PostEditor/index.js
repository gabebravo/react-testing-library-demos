import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 18%;
  margin: auto;
`;

export default function Editor() {
  return (
    <StyledForm>
      <label aria-label="Title field input" htmlFor="title-input">
        Title
      </label>
      <input id="title-input" />

      <label htmlFor="content-input">Content</label>
      <textarea id="content-input" />

      <label htmlFor="tags-input">Tags</label>
      <input id="tags-input" />

      <button aria-label="Woooooo hooooo!!!" type="submit">
        Submit
      </button>
    </StyledForm>
  );
}
