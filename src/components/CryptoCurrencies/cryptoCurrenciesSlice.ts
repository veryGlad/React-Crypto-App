import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios/axios';

type SliceState =
  | { loading: boolean }
  | { loading: boolean; data: ICurrency[] };

const initialState: SliceState = { loading: false, data: [] };

export const cryptoCurrenciesSlice = createSlice({
  name: 'cryptoCurrencies',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoCurrencies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCryptoCurrencies.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });
  },
});

export interface ICurrency {
  name: string;
  id: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
}

export const fetchCryptoCurrencies = createAsyncThunk(
  'cryptoCurrencies/fetchCryptoCurrencies',
  async (arg: string) => {
    const response = await axios.get(`/coins/markets?vs_currency=${arg}`);
    return response.data as ICurrency[];
  }
);

export default cryptoCurrenciesSlice.reducer;
