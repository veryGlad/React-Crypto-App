import * as React from 'react';
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAppSelector } from '../../store';
import './progressBar.scss';

const LinearProgressWithLabel = (
  props: LinearProgressProps & { value: number }
) => {
  const { currencyInfo } = useAppSelector((state) => {
    return {
      currencyInfo: state.cryptoCurrencyPageReducer.data,
    };
  });

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
      >
        <Box sx={{ width: '80%' }}>
          <LinearProgress color={'inherit'} variant="determinate" {...props} />
        </Box>
        <Box
          marginTop={1}
          display={'flex'}
          justifyContent={'space-between'}
          width={'80%'}
        >
          <Typography
            alignContent={'flex-end'}
            variant="body2"
            color="#f76161"
            fontWeight={'bold'}
          >
            $
            {currencyInfo && currencyInfo?.market_data.low_24h.usd >= 1
              ? currencyInfo?.market_data.low_24h.usd.toFixed(2)
              : currencyInfo?.market_data.low_24h.usd}
          </Typography>
          <Typography>Last 24 hour</Typography>
          <Typography variant="body2" color={'#73e373'} fontWeight={'bold'}>
            $
            {currencyInfo && currencyInfo?.market_data.high_24h.usd >= 1
              ? currencyInfo?.market_data.high_24h.usd.toFixed(2)
              : currencyInfo?.market_data.high_24h.usd}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LinearProgressWithLabel;
