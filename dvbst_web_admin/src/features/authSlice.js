import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import jwtDecode from "jwt-decode";

const user = localStorage.getItem("token");
const API_URL = 'http://localhost:8080';

// const initialState = user
//     ? { isLoggedIn: true, user }
//     : { isLoggedIn: false, user: null };

const initialState = {
    token: localStorage.getItem("token"),
    id: "",
    loginStatus: "",
    loginError: "",
    userLoaded: false,
  };

export const login = createAsyncThunk("auth/login", async ({ email, password }, {
    rejectWithValue }) => {
    try {
        console.log("Slice ", email, password)
        const { data: result } = await axios.post(API_URL + "/login/admin", { email, password })
        if (result) {
            localStorage.setItem("token", result)
        }
        return result.data;
    } catch (error) {
        console.log("Error", error.response.data)
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
        // checkLoggedIn(state, action) {
        //     if (localStorage.getItem("token") === "") {
        //         state.isLoggedIn = false
        //         state.user = null
        //     }
        // },
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
        [login.pending]: (state, action) => {
            return {
                ...state,
                loginStatus: "pending"
            }
        },
        [login.fulfilled]: (state, action) => {
            if (action.payload) {
                const user = jwtDecode(action.payload);
                return {
                  ...state,
                  token: action.payload,
                  id: user.id,
                  loginStatus: "success",
                };
              } else return state;
        },
        [login.rejected]: (state, action) => {
            return {
                ...state,
                loginStatus: "failed",
                loginError: action.payload,
            }
        },

        // [login.pending]: (state, action) => {
        //     state.isLoggedIn = true;
        //     state.user = action.payload;
        // },
        // [login.fulfilled]: (state, action) => {
        //     state.isLoggedIn = true;
        //     state.user = action.payload;
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