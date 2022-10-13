import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios/axios';

type SliceState = {
  loadingCryptocurrencies: boolean;
  data?: ICurrency[];
  loadingGlobalCurrencyData: boolean;
  globalCurrencyData?: IGlobalCurrencyData;
};

const initialState: SliceState = {
  loadingCryptocurrencies: false,
  loadingGlobalCurrencyData: false,
};

export const cryptoCurrenciesSlice = createSlice({
  name: 'cryptoCurrencies',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoCurrencies.pending, (state) => {
        state.loadingCryptocurrencies = true;
      })
      .addCase(fetchCryptoCurrencies.fulfilled, (state, action) => {
        state.loadingCryptocurrencies = false;
        state.data = action.payload;
      })
      .addCase(fetchGlobalCurrencyData.pending, (state) => {
        state.loadingGlobalCurrencyData = true;
      })
      .addCase(fetchGlobalCurrencyData.fulfilled, (state, action) => {
        state.loadingGlobalCurrencyData = false;
        state.globalCurrencyData = action.payload;
      });
  },
});

export interface ICurrency {
  name: string;
  id: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap?: number;
  market_cap_rank?: number;
  price_change_percentage_24h: number;
}

export const fetchCryptoCurrencies = createAsyncThunk(
  'cryptoCurrencies/fetchCryptoCurrencies',
  async (args: { toCurrency: string; pageNumber?: number }) => {
    const response = await axios.get(
      `/coins/markets?vs_currency=${args.toCurrency}&page=${
        args.pageNumber || 1
      }`
    );
    return response.data as ICurrency[];
  }
);

export interface IGlobalCurrencyData {
  active_cryptocurrencies: number;
}

export const fetchGlobalCurrencyData = createAsyncThunk(
  'cryptoCurrencies/fetchGlobalCurrencyData',
  async () => {
    const response = await axios.get('/global');
    return response.data.data as IGlobalCurrencyData;
  }
);

export default cryptoCurrenciesSlice.reducer;
