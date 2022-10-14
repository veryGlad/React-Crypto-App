import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cryptoCurrenciesReducer from './components/CryptoCurrencies/cryptoCurrenciesSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import cryptoCurrencyPageReducer from './components/CryptoCurrencyPage/cryptoCurrencyPageSlice';

const rootReducer = combineReducers({
  cryptoCurrenciesReducer,
  cryptoCurrencyPageReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
