import React from 'react';
import { useAppSelector } from '../../store';
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { ICurrency } from './cryptoCurrenciesSlice';

const million = 1_000_000;
const billion = 1_000_000_000;

const CurrenciesTable = () => {
  const { cryptoCurrencies } = useAppSelector((state) => {
    return {
      cryptoCurrencies: state.cryptoCurrenciesReducer.data,
      fetchStatus: state.cryptoCurrenciesReducer.loading,
    };
  });

  const getMarketCap = (marketCap: number): string => {
    if (marketCap / billion >= 1) {
      return `${(marketCap / billion).toFixed(2)}B`;
    }
    if (marketCap / million >= 1) {
      return `${(marketCap / million).toFixed(2)}M`;
    }
    return '';
  };

  console.log(cryptoCurrencies);

  return (
    <Container maxWidth={'xl'}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell variant={'head'}>#</TableCell>
              <TableCell variant={'head'}>Name(img)</TableCell>
              <TableCell>Symbol</TableCell>
              <TableCell>Current price</TableCell>
              <TableCell>24H Change %</TableCell>
              <TableCell>Market cap</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cryptoCurrencies.map((currency: ICurrency) => (
              <TableRow
                key={currency.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {currency.market_cap_rank}
                </TableCell>
                <TableCell valign={'middle'}>
                  <Box marginRight={10}>
                    <img
                      height={20}
                      width={20}
                      src={currency.image}
                      alt={`${currency.name}-logo`}
                    />
                  </Box>
                  {currency.name}
                </TableCell>
                <TableCell>{currency.symbol.toUpperCase()}</TableCell>
                <TableCell>{currency.current_price}</TableCell>
                <TableCell>
                  {currency.price_change_percentage_24h.toFixed(2)} %
                </TableCell>
                <TableCell>{getMarketCap(currency.market_cap)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CurrenciesTable;
