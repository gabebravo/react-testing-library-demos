import React from 'react';
import { useHistory } from 'react-router-dom';

export default function NavBar() {
  let history = useHistory();

  return (
    <div>
      <button className="button button-clear" onClick={() => history.push('/')}>
        Home
      </button>
    </div>
  );
}
