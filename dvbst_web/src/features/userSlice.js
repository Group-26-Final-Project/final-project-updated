import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CustomAxios from '../Api/CustomAxios'

const initialState = {
    user: null,
    getUserStatus: "",
    getUserError: "",
    editUserStatus: "",
    editUserError: "",
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getUser = createAsyncThunk("user/getUser", async (id, {
    rejectWithValue }) => {
    try {
        const response = await CustomAxios.get("/user/" + id)
        console.log(response)
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})

export const editUser = createAsyncThunk("user/editUser", async ({ id, user }, {
    rejectWithValue }) => {
    try {
        console.log("Here", id, user)
        const response = await CustomAxios.patch("/candidates/complete/" + id, user)
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearUser(state, action) {
            return {
                user: null,
                getUserStatus: "",
                getUserError: "",
                editUserStatus: "",
                editUserError: "",
            };
        }
    },
    extraReducers: {
        [getUser.pending]: (state, action) => {
            return {
                ...state,
                getUserStatus: "pending",
            }
        },
        [getUser.fulfilled]: (state, action) => {
            return {
                ...state,
                user: action.payload,
                getUserStatus: "success"
            }
        },
        [getUser.rejected]: (state, action) => {
            return {
                ...state,
                getUserStatus: "failed",
                getUserError: action.payload
            }
        },
        [editUser.pending]: (state, action) => {
            return {
                ...state,
                editUserStatus: "pending",
            }
        },
        [editUser.fulfilled]: (state, action) => {
            return {
                ...state,
                user: action.payload,
                editUserStatus: "success"
            }
        },
        [editUser.rejected]: (state, action) => {
            return {
                ...state,
                editUserStatus: "failed",
                editUserError: action.payload
            }
        },
    }
})

export default userSlice.reducer;