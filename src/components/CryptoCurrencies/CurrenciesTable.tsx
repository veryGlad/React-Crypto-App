import React, { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  Box,
  Container,
  Pagination,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  fetchCryptoCurrencies,
  fetchGlobalCurrencyData,
  ICurrency,
} from './cryptoCurrenciesSlice';
import './currenciesTable.scss';

const million = 1_000_000;
const billion = 1_000_000_000;

const CurrenciesTable = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchCryptoCurrencies({ toCurrency: 'usd' }));
    dispatch(fetchGlobalCurrencyData());
  }, [dispatch]);

  const { fetchStatus, cryptoCurrencies, currenciesCount } = useAppSelector(
    (state) => {
      return {
        cryptoCurrencies: state.cryptoCurrenciesReducer.data,
        fetchStatus: state.cryptoCurrenciesReducer.loadingCryptocurrencies,
        currenciesCount:
          state.cryptoCurrenciesReducer.globalCurrencyData
            ?.active_cryptocurrencies,
      };
    }
  );

  const getMarketCap = (marketCap: number): string => {
    if (marketCap / billion >= 1) {
      return `${(marketCap / billion).toFixed(2)}B`;
    }
    if (marketCap / million >= 1) {
      return `${(marketCap / million).toFixed(2)}M`;
    }
    return '';
  };

  const pagesQuantity = React.useMemo(
    (): number => Math.ceil(Number(currenciesCount) / 100),
    [currenciesCount]
  );

  const handlePageChange = React.useCallback(
    (event: ChangeEvent<unknown>, pageNumber: number) => {
      dispatch(
        fetchCryptoCurrencies({ toCurrency: 'usd', pageNumber: pageNumber })
      );
    },
    [dispatch]
  );

  return (
    <Container maxWidth={'lg'}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name(img)</TableCell>
              <TableCell>Symbol</TableCell>
              <TableCell>Current price</TableCell>
              <TableCell>24H Change %</TableCell>
              <TableCell>Market cap</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fetchStatus
              ? new Array(100).fill('').map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell colSpan={6} scope="row">
                      <Skeleton width={'100%'} height={'100%'} />
                    </TableCell>
                  </TableRow>
                ))
              : cryptoCurrencies?.map((currency: ICurrency) => (
                  <TableRow
                    key={currency.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {currency.market_cap_rank}
                    </TableCell>
                    <TableCell valign={'middle'}>
                      <Box display={'flex'} alignItems={'center'}>
                        <Box
                          display={'flex'}
                          alignItems={'center'}
                          marginRight={1}
                        >
                          <img
                            height={20}
                            width={20}
                            src={currency.image}
                            alt={`${currency.name}-logo`}
                          />
                        </Box>
                        {currency.name}
                      </Box>
                    </TableCell>
                    <TableCell>{currency.symbol?.toUpperCase()}</TableCell>
                    <TableCell>${currency.current_price}</TableCell>
                    <TableCell>
                      {currency.price_change_percentage_24h?.toFixed(2)} %
                    </TableCell>
                    <TableCell>
                      {currency.market_cap
                        ? `$${getMarketCap(currency.market_cap)}`
                        : 'NaN'}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        {pagesQuantity ? (
          <Pagination count={pagesQuantity} onChange={handlePageChange} />
        ) : null}
      </TableContainer>
    </Container>
  );
};

export default CurrenciesTable;
