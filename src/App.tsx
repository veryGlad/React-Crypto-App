import React from 'react';
import './App.css';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CryptoCurrencies from './components/CryptoCurrencies/CryptoCurrencies';
import Portfolio from './components/Portfolio/Portfolio';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={'/'} element={<div />} />
          <Route path={'/crypto'} element={<CryptoCurrencies />} />
          <Route path={'/portfolio'} element={<Portfolio />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
