import React from 'react';
import styled from 'styled-components';
import { savePost } from '../../utils/api';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 18%;
  margin: auto;
`;

export default function PostEditor({ user }) {
  const [isSaving, setIsSaving] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const { title, content, tags } = e.target.elements;
    setIsSaving(true);
    savePost({
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map(t => t.trim()),
      authorId: user.id
    });
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label aria-label="Info for reader here" htmlFor="title-input">
        Title
      </label>
      <input id="title-input" name="title" />

      <label htmlFor="content-input">Content</label>
      <textarea id="content-input" name="content" />

      <label htmlFor="tags-input">Tags</label>
      <input id="tags-input" name="tags" />

      <button aria-label="Woooooo hooooo!!!" type="submit" disabled={isSaving}>
        Submit
      </button>
    </StyledForm>
  );
}
