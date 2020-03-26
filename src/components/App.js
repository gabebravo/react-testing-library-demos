import React from 'react';
import Routes from './Routes';
import { BrowserRouter as RouterWrapper } from 'react-router-dom';

export default function App() {
  return (
    <RouterWrapper>
      <Routes />
    </RouterWrapper>
  );
}
