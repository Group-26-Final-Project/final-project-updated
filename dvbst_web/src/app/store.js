import { configureStore } from '@reduxjs/toolkit';
import ideasReducer from '../features/ideasSlice';
import authReducer from '../features/authSlice';
import userReducer from '../features/userSlice';

export const store = configureStore({
  reducer: {
    authState: authReducer,
    ideasState: ideasReducer,
    userState:  userReducer
  },
});