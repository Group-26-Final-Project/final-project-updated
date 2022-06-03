import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const user = JSON.parse(localStorage.getItem("user"));
const API_URL = 'http://localhost:8080';

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

export const register = createAsyncThunk("auth/register", async (newUser,
    rejectWithValue) => {
    try {
        const response = await axios.post(API_URL + "signup", newUser);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const login = createAsyncThunk("auth/login", async ({ email }, {
    rejectWithValue }) => {
    try {
        const response = await axios.post(API_URL + "login", email);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const verify = createAsyncThunk("auth/verify", async ({ email, link }, {
    rejectWithValue }) => {
    try {
        await axios.post(API_URL + "verify", { email, link })
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const logout = createAsyncThunk("auth/logout", async () => {
    localStorage.removeItem("user");
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
        },
        [register.rejected]: (state, action) => {
            state.isLoggedIn = false;
        },
        [login.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user;
        },
        [login.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        [logout.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
    },
});
export default authSlice.reducer;
