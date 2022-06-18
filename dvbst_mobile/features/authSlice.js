import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import jwtDecode from "jwt-decode";
import { AsyncStorage } from '@react-native-async-storage/async-storage';

const API_URL = 'https://7add-197-156-103-216.eu.ngrok.io';

const initialState = {
    token: null,
    id: null,
    loginStatus: "",
    loginError: "",
    registerStatus: "",
    registerError: "",
    verifyStatus: "",
    verifyError: "",
};

export const register = createAsyncThunk("auth/register", async (newUser,
    rejectWithValue) => {
    try {
        const response = await axios.post(API_URL + "/pending", newUser);
        return response;
    } catch (error) {
        return rejectWithValue(error.response);
    }
});

export const login = createAsyncThunk("auth/login", async ({ email, password }, {
    rejectWithValue }) => {
    try {
        const response = await axios.post(API_URL + "/login/mobile", { email, password });
        console.log(response.data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const verify = createAsyncThunk("auth/verify", async ({ email, otp }, {
    rejectWithValue }) => {
    try {
        const response = await axios.post(API_URL + "/login/verify", { email, otp })
        console.log("Success", response)
        return response.data.token;
    } catch (error) {
        console.log("Error", error)
        return rejectWithValue(error.response.data);
    }
});

export const logout = createAsyncThunk("auth/logout", async () => {
    await AsyncStorage.removeItem("token")
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loadUser(state, action) {
            const token = state.token;
            if (token) {
                const user = jwtDecode(token);
                return {
                    ...state,
                    token,
                    id: user._name,
                    userLoaded: true,
                };
            } else return { ...state, userLoaded: true };
        },
        logoutUser(state, action) {
            AsyncStorage.removeItem("token");
            return {
                ...state,
                token: "",
                id: "",
                loginStatus: "",
                loginError: "",
            };
        }
    },
    extraReducers: {
        [register.pending]: (state, action) => {
            return {
                ...state,
                registerStatus: "pending"
            }
        },
        [register.fulfilled]: (state, action) => {
            return {
                ...state,
                registerStatus: "success"
            }
        },
        [register.rejected]: (state, action) => {
            return {
                ...state,
                registerStatus: "failed",
                registerError: action.payload,
            }
        },
        [login.pending]: (state, action) => {
            return {
                ...state,
                loginStatus: "pending"
            }
        },
        [login.fulfilled]: (state, action) => {
            const user = jwtDecode(action.payload);
            console.log(user)
            return {
                ...state,
                token: action.payload,
                id: user.id,
                loginStatus: "success",
            };
        },
        [login.rejected]: (state, action) => {
            return {
                ...state,
                loginStatus: "failed",
                loginError: action.payload,
            }
        },
        [verify.pending]: (state, action) => {
            return {
                ...state,
                verifyStatus: "pending"
            }
        },
        [verify.fulfilled]: (state, action) => {
            const user = jwtDecode(action.payload);
            console.log(user)
            return {
                ...state,
                token: action.payload,
                id: user.id,
                verifyStatus: "success",
            };
        },
        [verify.rejected]: (state, action) => {
            console.log("ACtion", action)
            return {
                ...state,
                verifyStatus: "failed",
                verifyError: action.payload,
            }
        },
        // [register.fulfilled]: (state, action) => {
        //     state.isLoggedIn = false;
        // },
        // [register.rejected]: (state, action) => {
        //     state.isLoggedIn = false;
        // },
        // [login.fulfilled]: (state, action) => {
        //     state.isLoggedIn = true;
        //     state.user = action.payload.user;
        // },
        // [login.rejected]: (state, action) => {
        //     state.isLoggedIn = false;
        //     state.user = null;
        // },
        // [logout.fulfilled]: (state, action) => {
        //     state.isLoggedIn = false;
        //     state.user = null;
        // },
    },
});

export const { loadUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;