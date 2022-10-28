import { useAppDispatch, useAppSelector } from '../../store';
import { fetchExchanges, IExchanges } from './exchangesSlice';
import Container from '@mui/material/Container';
import {
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { ICurrency } from '../CryptoCurrencies/cryptoCurrenciesSlice';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import cryptoCurrencies from '../CryptoCurrencies/CryptoCurrencies';
import { useEffect } from 'react';

const Exchanges = () => {
  const dispatch = useAppDispatch();

  const { exchangesData, exchangesLoading } = useAppSelector((state) => {
    return {
      exchangesData: state.exchangesReducer.data,
      exchangesLoading: state.exchangesReducer.loadingExchanges,
    };
  });

  useEffect(() => {
    if (!exchangesLoading) {
      dispatch(fetchExchanges());
    }
  }, [dispatch]);

  return (
    <div>
      <Container maxWidth={'lg'}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name(img)</TableCell>
                <TableCell> Trust score</TableCell>
                <TableCell>Trade volume 24h(BTC)</TableCell>
                <TableCell>Trade volume 24h(BTC) normalized</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exchangesLoading
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
                : exchangesData?.map((exchange: IExchanges) => (
                    <TableRow
                      key={exchange.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {exchange.trust_score_rank}
                      </TableCell>
                      <TableCell valign={'middle'}>
                        <Link
                          to={`/crypto/${exchange.id}`}
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
                                src={exchange.image}
                                alt={`${exchange.name}-logo`}
                              />
                            </Box>
                            {exchange.name}
                          </Box>
                        </Link>
                      </TableCell>
                      <TableCell>{exchange.trust_score}</TableCell>
                      <TableCell>
                        {exchange.trade_volume_24h_btc.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {exchange.trade_volume_24h_btc_normalized.toFixed(2)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default Exchanges;
