import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import candidatesReducer from '../features/candidatesSlice';
import electionsReducer from '../features/electionsSlice';
import votersReducer from '../features/votersSlice';
import blacklistReducer from '../features/blacklistSlice';
import pendingReducer from '../features/pendingSlice';

export const store = configureStore({
  reducer: {
    authState: authReducer,
    blacklistState: blacklistReducer,
    pendingState: pendingReducer,
    candidatesState: candidatesReducer,
    electionsState: electionsReducer,
    votersState: votersReducer,
  },
});