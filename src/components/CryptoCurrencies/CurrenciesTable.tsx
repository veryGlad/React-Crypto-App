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
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';

const million = 1_000_000;
const billion = 1_000_000_000;

const CurrenciesTable = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchCryptoCurrencies({ toCurrency: 'usd' }));
    dispatch(fetchGlobalCurrencyData());
  }, [dispatch]);

  const { fetchStatus, cryptoCurrencies, globalCurrencyData } = useAppSelector(
    (state) => {
      console.log(state.cryptoCurrenciesReducer.globalCurrencyData);
      return {
        cryptoCurrencies: state.cryptoCurrenciesReducer.data,
        fetchStatus: state.cryptoCurrenciesReducer.loadingCryptocurrencies,
        globalCurrencyData: state.cryptoCurrenciesReducer.globalCurrencyData,
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
    (): number =>
      Math.ceil(Number(globalCurrencyData?.active_cryptocurrencies) / 100),
    [globalCurrencyData]
  );

  const handlePageChange = React.useCallback(
    (event: ChangeEvent<unknown>, pageNumber: number) => {
      dispatch(
        fetchCryptoCurrencies({ toCurrency: 'usd', pageNumber: pageNumber })
      );
    },
    [dispatch]
  );

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
  }));

  return (
    <Container maxWidth={'lg'}>
      <Box marginTop={2}>
        <div>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
            width={'100%'}
            justifyContent={'center'}
          >
            <Item>
              <Box display={'flex'}>
                <Typography color={'lightslategrey'}>
                  Crypto market capitalization
                </Typography>
                <Typography marginLeft={1} fontWeight={'bold'}>
                  $
                  {getMarketCap(
                    globalCurrencyData?.total_market_cap.usd as number
                  )}
                </Typography>
              </Box>
            </Item>
            <Item>
              <Box display={'flex'}>
                <Typography color={'lightslategrey'}>
                  Crypto market capitalization 24h change
                </Typography>
                <Typography
                  marginLeft={1}
                  fontWeight={'bold'}
                  color={
                    globalCurrencyData &&
                    globalCurrencyData?.market_cap_change_percentage_24h_usd > 0
                      ? '#73e373'
                      : '#f76161'
                  }
                >
                  {globalCurrencyData?.market_cap_change_percentage_24h_usd.toFixed(
                    2
                  )}
                  %
                </Typography>
              </Box>
            </Item>
            <Item>
              <Box display={'flex'}>
                <Typography color={'lightslategrey'}>
                  Bitcoin domination
                </Typography>
                <Typography marginLeft={1} fontWeight={'bold'}>
                  {globalCurrencyData?.market_cap_percentage.btc.toFixed(2)}%
                </Typography>
              </Box>
            </Item>
          </Stack>
        </div>
      </Box>
      <Box marginTop={2}>
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
                        <Link
                          to={`/crypto/${currency.id}`}
                          className="cryptoLink"
                        >
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
                        </Link>
                      </TableCell>
                      <TableCell>{currency.symbol?.toUpperCase()}</TableCell>
                      <TableCell>${currency.current_price}</TableCell>
                      <TableCell>
                        <Typography
                          color={
                            currency.price_change_percentage_24h > 0
                              ? '#73e373'
                              : '#f76161'
                          }
                        >
                          {currency.price_change_percentage_24h?.toFixed(2)} %
                        </Typography>
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
      </Box>
    </Container>
  );
};

export default CurrenciesTable;
