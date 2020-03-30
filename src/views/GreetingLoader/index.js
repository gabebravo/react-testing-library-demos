import React from 'react';
import styled from 'styled-components';
import { loadGreeting } from '../../utils/api';

const StyledButton = styled.button`
  margin-left: 1rem;
`;

export default function GreetingLoader() {
  const [greeting, setGreeting] = React.useState('');

  async function loadGreetingForInput(e) {
    e.preventDefault();
    const { data } = await loadGreeting(e.target.elements.name.value);
    setGreeting(data.greeting);
  }

  return (
    <div className="container">
      <form onSubmit={loadGreetingForInput}>
        <label htmlFor="name">Name</label>
        <input id="name" />
        <StyledButton type="submit">Load Greeting</StyledButton>
        <div aria-label="greeting">{greeting}</div>
        <div aria-label="yay">ARIA LABEL MESSAGE</div>
      </form>
    </div>
  );
}
