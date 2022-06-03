import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import candidatesReducer from '../features/candidatesSlice';
import votersReducer from '../features/votersSlice';

export const store = configureStore({
  reducer: {
    authState: authReducer,
    candidatesState: candidatesReducer,
    votersState: votersReducer
  },
});