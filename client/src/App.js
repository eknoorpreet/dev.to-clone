import React from 'react';
import './App.css';
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
