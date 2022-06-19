import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import jwtDecode from "jwt-decode";
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { storeData } from "../Api/StoreToken";
import { removeData } from "../Api/RemoveToken";

const API_URL = 'https://7add-197-156-103-216.eu.ngrok.io';

const initialState = {
    token: null,
    id: null,
    loginStatus: "",
    loginError: "",
    registerStatus: "",
    registerError: "",
    logoutStatus: "",
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
        // console.log(response, "Response")
        if (response.data) {
            storeData(response.data)
        }
        return response.data
    } catch (error) {
        // console.log("error", error)
        return rejectWithValue(error.response.data);
    }
});

export const logout = createAsyncThunk("auth/logout", async () => {
    removeData()
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
        [logout.pending]: (state, action) => {
            return {
                ...state,
                logoutStatus: "pending"
            }
        },
        [logout.fulfilled]: (state, action) => {
            return {
                ...state,
                token: "",
                id: "",
                logoutStatus: "success"
            };
        },
        [logout.rejected]: (state, action) => {
            console.log("ACtion", action)
            return {
                ...state,
                logoutStatus: "failed"
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

export const { loadUser } = authSlice.actions;
export default authSlice.reducer;