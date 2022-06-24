import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import ideasReducer from '../features/ideasSlice';
import authReducer from '../features/authSlice';
import userReducer from '../features/userSlice';
import resetPasswordReducer from '../features/resetPassSlice';
import electionsReducer from '../features/electionsSlice'
import votingReducer from '../features/votingSlice'
import candidateReducer from '../features/candidatesSlice'

export const store = configureStore({
  reducer: {
    authState: authReducer,
    ideasState: ideasReducer,
    resetPasswordState: resetPasswordReducer,
    userState: userReducer,
    electionsState: electionsReducer,
    votingState: votingReducer,
    candidatesState: candidateReducer
  },
});