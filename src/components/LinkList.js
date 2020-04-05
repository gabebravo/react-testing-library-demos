import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const StyledIcon = styled.span`
  margin-left: 2rem;
`;

export default function LinkList({ links }) {
  let history = useHistory();

  // MAGIC: React will internally assign unique keys when using React.Children.toArray for mapping elements
  const renderLinks = () => (
    <>
      {React.Children.toArray(
        links.map(({ text, url }) => (
          <li>
            {text}
            <StyledIcon
              data-testid={text}
              onClick={() => history.push(`/${url}`)}
              className="fas fa-link"
            />
          </li>
        ))
      )}
    </>
  );

  return <ol>{links && renderLinks()}</ol>;
}

/* ACCESSIBLE VERSION ____________

const renderLinks = () => (
  <>
    {React.Children.toArray(
      links.map(({ text, url }) => (
        <li>
          {text}
          <StyledButton
            className="button button-clear"
            aria-label={text}
            onClick={() => history.push(`/${url}`)}
          >
            <span data-testid={text} className="fas fa-link" />
          </StyledButton>
        </li>
      ))
    )}
  </>
);

*/
