import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import ideasReducer from '../features/ideasSlice';
import authReducer from '../features/authSlice';

export const store = configureStore({
  reducer: {
    authState: authReducer,
    ideasState: ideasReducer
  },
});