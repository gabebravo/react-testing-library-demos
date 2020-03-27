import React from 'react';

export default function FavoriteNumber({ min = 1, max = 9 }) {
  const [number, setNumber] = React.useState(0);

  function handleChange(event) {
    setNumber(Number(event.target.value));
  }

  const isValid = number >= min && number <= max;

  return (
    <div className="container">
      <label style={{ marginTop: '5rem' }} htmlFor="favorite-number">
        favorite Number
      </label>
      <input
        id="favorite-number"
        type="number"
        value={number}
        onChange={handleChange}
      />
      {isValid ? null : <div role="alert">The number is invalid</div>}
    </div>
  );
}
