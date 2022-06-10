import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import jwtDecode from "jwt-decode";

const API_URL = 'http://localhost:8080';

// const initialState = user
//     ? { isLoggedIn: true, user }
//     : { isLoggedIn: false, user: null };
const initialState = {
    token: localStorage.getItem("token"),
    id: localStorage.getItem("token") ? jwtDecode(localStorage.getItem("token")).id : "",
    loginStatus: "",
    loginError: "",
    registerStatus: "",
    registerError: "",
    verifyStatus: "",
    verifyError: "",
    userLoaded: false,
};

export const register = createAsyncThunk("auth/register", async (newUser,
    rejectWithValue) => {
    try {
        const response = await axios.post(API_URL + "/pending", newUser); 
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const login = createAsyncThunk("auth/login", async ({ email, link }, {
    rejectWithValue }) => {
    try {
        console.log("Email", email, link)
        const response = await axios.post(API_URL + "/login/enter", { email, link });
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const verify = createAsyncThunk("auth/verify", async ({ email, link }, {
    rejectWithValue }) => {
    try {
        const { data: result } = await axios.post(API_URL + "/login/enter", { email, link })
        if (result) {
            localStorage.setItem("token", result)
        }
        console.log("result", result)
        return result;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const logout = createAsyncThunk("auth/logout", async () => {
    localStorage.removeItem("token");
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
            localStorage.removeItem("token");
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
            return {
                ...state,
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