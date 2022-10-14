import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios/axios';

type SliceState = {
  loadingCryptocurrencyInfo: boolean;
  data?: ICurrencyInfo;
};

const initialState: SliceState = {
  loadingCryptocurrencyInfo: false,
};

export const cryptoCurrencyPageSlice = createSlice({
  name: 'cryptoCurrencyPage',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoCurrencyInfo.pending, (state) => {
        state.loadingCryptocurrencyInfo = true;
      })
      .addCase(fetchCryptoCurrencyInfo.fulfilled, (state, action) => {
        state.loadingCryptocurrencyInfo = false;
        state.data = action.payload;
      });
  },
});

export interface ICurrencyInfo {
  name: string;
  id: string;
  symbol: string;
  image: ICurrencyImg;
  market_data: ICurrencyMarketData;
  market_cap_rank?: number;
  price_change_percentage_24h: ICommunityData;
}

export interface ICurrencyMarketData {
  ath: ICurrencyMarketAthData;
  ath_date: ICurrencyMarketAthDate;
  max_supply: number;
  current_price: ICurrencyCurrentPrice;
  high_24h: ICurrencyHigh24h;
  low_24h: ICurrencyLow24h;
  market_cup: ICurrencyMarketCup;
  price_change_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_24h: number;
}

export interface ICommunityData {
  facebook_likes: number;
}

export interface ICurrencyImg {
  large: string;
}

export interface ICurrencyMarketAthData {
  usd: number;
}

export interface ICurrencyMarketAthDate {
  usd: string;
}

export interface ICurrencyCurrentPrice {
  usd: number;
}

export interface ICurrencyHigh24h {
  usd: number;
}

export interface ICurrencyLow24h {
  usd: number;
}

export interface ICurrencyMarketCup {
  usd: number;
}

export const fetchCryptoCurrencyInfo = createAsyncThunk(
  'cryptoCurrencyPage/fetchCryptoCurrencyInfo',
  async (args: { id: string }) => {
    const response = await axios.get(`/coins/${args.id}`);
    return response.data as ICurrencyInfo;
  }
);

export default cryptoCurrencyPageSlice.reducer;
