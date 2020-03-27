import React from 'react';
import Routes from './Routes';
import Navbar from './Navbar';
import { BrowserRouter as RouterWrapper } from 'react-router-dom';

export default function App() {
  return (
    <RouterWrapper>
      <Navbar />
      <Routes />
    </RouterWrapper>
  );
}
