import React from 'react';
import './styles/main.css';
import AppProviders from './components/AppProviders/AppProviders';
import MainRouter from './MainRouter';

const App = () => {
  return (
    <AppProviders>
      <MainRouter />
    </AppProviders>
  );
};

export default App;
