import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import CryptoCurrencies from './components/CryptoCurrencies/CryptoCurrencies';
import CryptoCurrencyPage from './components/CryptoCurrencyPage/CryptoCurrencyPage';
import Exchanges from './components/Exchanges/Exchanges';

function App() {
  let id = useParams();

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={'/'} element={<div />} />
          <Route path={'/crypto'} element={<CryptoCurrencies />} />
          <Route path={'/exchanges'} element={<Exchanges />} />
          <Route path={'/crypto/:id'} element={<CryptoCurrencyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
