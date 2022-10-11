import React from 'react';
import { useAppDispatch } from '../../store';
import { fetchCryptoCurrencies } from './cryptoCurrenciesSlice';
import CurrenciesTable from './CurrenciesTable';

const CryptoCurrencies = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchCryptoCurrencies('usd'));
  }, [dispatch]);

  return (
    <div>
      <CurrenciesTable />
    </div>
  );
};

export default CryptoCurrencies;
