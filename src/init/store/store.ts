import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './store.reducer';
import middlewares from './store.middleware';
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from 'react-redux';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(middlewares),
  devTools: process.env.NODE_ENV !== 'production',
});

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

export default store;
