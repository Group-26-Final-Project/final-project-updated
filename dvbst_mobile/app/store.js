import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import ideasReducer from '../features/ideasSlice';
import authReducer from '../features/authSlice';
import resetPasswordReducer from '../features/resetPassSlice';

export const store = configureStore({
  reducer: {
    authState: authReducer,
    ideasState: ideasReducer,
    resetPasswordState: resetPasswordReducer,
  },
});