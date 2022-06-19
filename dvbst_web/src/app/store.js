import { configureStore } from '@reduxjs/toolkit';
import ideasReducer from '../features/ideasSlice';
import authReducer from '../features/authSlice';
import userReducer from '../features/userSlice';
import electionsReducer from '../features/electionsSlice';
import resetPassReducer from '../features/resetPassSlice';

export const store = configureStore({
  reducer: {
    authState: authReducer,
    ideasState: ideasReducer,
    userState:  userReducer,
    resetPasswordState: resetPassReducer,
    electionsState: electionsReducer
  },
});