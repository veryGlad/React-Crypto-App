import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchCryptoCurrencyInfo } from './cryptoCurrencyPageSlice';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import LinearWithValueLabel from '../UI/ProgressBar';
import LinearProgressWithLabel from '../UI/ProgressBar';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const CryptoCurrencyPage = () => {
  const dispatch = useAppDispatch();

  let { id } = useParams();

  React.useEffect(() => {
    if (id) {
      dispatch(fetchCryptoCurrencyInfo({ id: id }));
    }
  }, [dispatch, id]);

  const { currencyInfo } = useAppSelector((state) => {
    return {
      currencyInfo: state.cryptoCurrencyPageReducer.data,
    };
  });

  const currentPriceBy24MinMaxPercent = React.useMemo((): number | null => {
    if (currencyInfo) {
      return (
        (100 *
          (currencyInfo.market_data.current_price.usd -
            currencyInfo.market_data.low_24h.usd)) /
        (currencyInfo.market_data.high_24h.usd -
          currencyInfo.market_data.low_24h.usd)
      );
    } else {
      return null;
    }
  }, [currencyInfo]);

  const is24hChangePositive = React.useMemo(
    (): boolean =>
      !!currencyInfo &&
      currencyInfo.market_data.price_change_percentage_24h > 0,
    [currencyInfo]
  );

  return (
    <Container maxWidth={'xl'}>
      <Box sx={{ width: '100%' }}>
        <Grid
          container
          rowSpacing={5}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          marginTop={5}
        >
          <Grid xs={6}>
            <Item>
              <Box padding={3}>
                <Box display={'flex'} marginBottom={2.5}>
                  <Box marginRight={2}>
                    <img
                      src={currencyInfo?.image.large}
                      alt={`${currencyInfo?.name} Logo`}
                      width={50}
                      height={50}
                      className="currencyImg"
                    />
                  </Box>
                  <Typography variant={'h3'} color={'white'}>
                    {currencyInfo?.name} ({currencyInfo?.symbol.toUpperCase()})
                  </Typography>
                </Box>
                <Box>
                  <Divider variant="middle" />
                </Box>
                <Box display={'flex'} marginTop={3} marginLeft={1}>
                  <Typography variant={'h4'} color={'white'}>
                    $ {currencyInfo?.market_data.current_price.usd}
                  </Typography>
                  <Typography
                    variant={'h6'}
                    color={is24hChangePositive ? 'green' : 'red'}
                    marginLeft={1}
                  >
                    {currencyInfo?.market_data.price_change_percentage_24h.toFixed(
                      1
                    )}
                    %
                  </Typography>
                </Box>
              </Box>
            </Item>
          </Grid>
          <Grid xs={6} alignSelf={'flex-end'}>
            <Item>
              <Box paddingTop={6} paddingBottom={4}>
                <LinearWithValueLabel
                  classes={{ root: 'progressBar' }}
                  value={Number(currentPriceBy24MinMaxPercent)}
                />
              </Box>
            </Item>
          </Grid>
          <Grid xs={6}>
            <Item>
              <Box padding={2}>
                <Box
                  display={'flex'}
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  className="currencyInfo"
                >
                  <p>All time high</p>
                  <p>${currencyInfo?.market_data.ath.usd}</p>
                </Box>

                <Divider variant="middle" />

                <Box
                  display={'flex'}
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  className="currencyInfo"
                >
                  <p>All time high date</p>
                  <p>
                    {currencyInfo &&
                      new Date(
                        currencyInfo?.market_data.ath_date.usd
                      ).toDateString()}
                  </p>
                </Box>

                <Divider variant="middle" />

                <Box
                  display={'flex'}
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  className="currencyInfo"
                >
                  <p>24H high</p>
                  <p>
                    $
                    {currencyInfo && currencyInfo?.market_data.high_24h.usd >= 1
                      ? currencyInfo?.market_data.high_24h.usd.toFixed(2)
                      : currencyInfo?.market_data.high_24h.usd}
                  </p>
                </Box>

                <Divider variant="middle" />

                <Box
                  display={'flex'}
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  className="currencyInfo"
                >
                  <p>24H low</p>
                  <p>
                    $
                    {currencyInfo && currencyInfo?.market_data.low_24h.usd >= 1
                      ? currencyInfo?.market_data.low_24h.usd.toFixed(2)
                      : currencyInfo?.market_data.low_24h.usd}
                  </p>
                </Box>
              </Box>
            </Item>
          </Grid>
          <Grid xs={6}>
            <Item>
              <Box padding={2}>
                <Box
                  display={'flex'}
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  className="currencyInfo"
                >
                  <p>24H price change</p>
                  <p>
                    $
                    {currencyInfo &&
                    currencyInfo?.market_data.price_change_24h >= 1
                      ? currencyInfo?.market_data.price_change_24h.toFixed(2)
                      : currencyInfo?.market_data.price_change_24h}
                  </p>
                </Box>

                <Divider variant="middle" />

                <Box
                  display={'flex'}
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  className="currencyInfo"
                >
                  <p>Market cap rank</p>
                  <p># {currencyInfo?.market_cap_rank}</p>
                </Box>

                <Divider variant="middle" />

                <Box
                  display={'flex'}
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  className="currencyInfo"
                >
                  <p>Max supply</p>
                  <p>{currencyInfo?.market_data.max_supply}</p>
                </Box>

                <Divider variant="middle" />

                <Box
                  display={'flex'}
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  className="currencyInfo"
                >
                  <p>Last 7 days price change</p>
                  <p>{currencyInfo?.market_data.price_change_percentage_7d}</p>
                </Box>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CryptoCurrencyPage;
