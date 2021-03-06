import React from 'react';
import { Redirect } from 'react-router-dom';
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
  const [redirect, setRedirect] = React.useState(false);
  const [error, setError] = React.useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const { title, content, tags } = e.target.elements;
    const newPost = {
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map(t => t.trim()),
      date: new Date().toISOString(),
      authorId: user.id
    };
    setIsSaving(true);
    // IMP : waits for API POST to resolve and then sets redirect flag
    savePost(newPost)
      .then(() => setRedirect(true))
      .catch(res => {
        setIsSaving(false);
        setError(res.data.error);
      });
  }

  // will trigger the redirect on rerender
  if (redirect) {
    return <Redirect to="/" />;
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
      {error && <div role="alert">{error}</div>}
    </StyledForm>
  );
}
