import { configureStore } from '@reduxjs/toolkit';
import ideasReducer from '../features/ideasSlice';
import authReducer from '../features/authSlice';
import userReducer from '../features/userSlice';
import electionsReducer from '../features/electionsSlice';
import resetPassReducer from '../features/resetPassSlice';
import votingReducer from '../features/votingSlice';
import candidatesReducer from '../features/candidatesSlice';

export const store = configureStore({
  reducer: {
    authState: authReducer,
    ideasState: ideasReducer,
    userState:  userReducer,
    resetPasswordState: resetPassReducer,
    candidatesState: candidatesReducer,
    electionsState: electionsReducer,
    votingState: votingReducer,
  },
});