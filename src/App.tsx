import React from 'react';
import './App.css';
import Header from './components/Header';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import CryptoCurrencies from './components/CryptoCurrencies/CryptoCurrencies';
import Portfolio from './components/Portfolio/Portfolio';
import CryptoCurrencyPage from './components/CryptoCurrencyPage/CryptoCurrencyPage';

function App() {
  let id = useParams();

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={'/'} element={<div />} />
          <Route path={'/crypto'} element={<CryptoCurrencies />} />
          <Route path={'/portfolio'} element={<Portfolio />} />
          <Route path={'/crypto/:id'} element={<CryptoCurrencyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
