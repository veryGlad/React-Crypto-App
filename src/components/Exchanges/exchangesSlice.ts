import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios/axios';

type SliceState = {
  loadingExchanges: boolean;
  data?: IExchanges[];
};

const initialState: SliceState = {
  loadingExchanges: false,
};

export const exchangesSlice = createSlice({
  name: 'exchanges',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchanges.pending, (state) => {
        state.loadingExchanges = true;
      })
      .addCase(fetchExchanges.fulfilled, (state, action) => {
        state.loadingExchanges = false;
        state.data = action.payload;
      });
  },
});

export interface IExchanges {
  name: string;
  image: string;
  trust_score: number;
  trust_score_rank: number;
  trade_volume_24h_btc: number;
  trade_volume_24h_btc_normalized: number;
  id: string;
}

export const fetchExchanges = createAsyncThunk(
  'cryptoCurrencies/fetchCryptoCurrencies',
  async (args?: { pageNumber: number }) => {
    const response = await axios.get(
      `/exchanges?page=${args?.pageNumber || 1}`
    );
    return response.data as IExchanges[];
  }
);

export default exchangesSlice.reducer;
