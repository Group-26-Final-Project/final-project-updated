import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CustomAxios from '../Api/CustomAxios'

const initialState = {
    resetToken: "",
    forgotPasswordStatus: "",
    forgotPasswordError: "",
    confirmCodeStatus: "",
    confirmCodeError: "",
    resetPasswordStatus: "",
    resetPasswordError: ""
};

export const forgotPassword = createAsyncThunk("reset/forgotPassword", async ({ email }, {
    rejectWithValue }) => {
        console.log("Forgot", email)
    try {
        const response = await CustomAxios.post("/reset", { email });
        return response.status
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const confirmCode = createAsyncThunk("reset/confirmCode", async ({ email, code }, {
    rejectWithValue }) => {
        console.log(email, code, "Slice")
    try {
        const response = await CustomAxios.post("/reset/confirm", { email, code });
        return response.data.resetToken
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const resetPassword = createAsyncThunk("reset/resetPassword", async ({ resetToken , password }, {
    rejectWithValue }) => {
    try {
        const response = await CustomAxios.post("/reset/newpass", { resetToken, password });
        return response.status
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const resetPasswordSlice = createSlice({
    name: "reset",
    initialState,
    reducers: {},
    extraReducers: {
        [forgotPassword.pending]: (state, action) => {
            return {
                ...state,
                forgotPasswordStatus: "pending"
            }
        },
        [forgotPassword.fulfilled]: (state, action) => {
            return {
                ...state,
                forgotPasswordStatus: "success"
            }
        },
        [forgotPassword.rejected]: (state, action) => {
            return {
                ...state,
                forgotPasswordStatus: "failed",
                forgotPasswordError: action.payload,
            }
        },
        [confirmCode.pending]: (state, action) => {
            return {
                ...state,
                confirmCodeStatus: "pending"
            }
        },
        [confirmCode.fulfilled]: (state, action) => {
            return {
                ...state,
                resetToken: action.payload,
                confirmCodeStatus: "success",
            };
        },
        [confirmCode.rejected]: (state, action) => {
            return {
                ...state,
                confirmCodeStatus: "failed",
                confirmCodeError: action.payload,
            }
        },
        [resetPassword.pending]: (state, action) => {
            return {
                ...state,
                resetPasswordStatus: "pending"
            }
        },
        [resetPassword.fulfilled]: (state, action) => {
            return {
                ...state,
                resetToken: "",
                resetPasswordStatus: "success",
            };
        },
        [resetPassword.rejected]: (state, action) => {
            return {
                ...state,
                resetPasswordStatus: "failed",
                resetPasswordError: action.payload,
            }
        },
    },
});

export default resetPasswordSlice.reducer;