import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CustomAxios from '../Api/CustomAxios'

const initialState = {
    pendingUsers: [],
    pendingUser: null,
    getUsersStatus: "",
    getUsersError: "",
    getUserStatus: "",
    getUserError: "",
    addVoterStatus: "",
    addVoterError: "",
    declineUserStatus: "",
    declineUserError: ""
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getUsers = createAsyncThunk("pending/getUsers", async (query, {
    rejectWithValue }) => {
    try {
        await timeout(1000)
        const response = await CustomAxios.get("/pending")
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})

export const getUser = createAsyncThunk("pending/getUser", async (id, {
    rejectWithValue }) => {
    try {
        await timeout(1000)
        const response = await CustomAxios.get("/pending/" + id)
        console.log(response)
        return response.data.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})

export const addUser = createAsyncThunk("pending/addUser", async (id, {
    rejectWithValue})=>{
        try{
            await timeout(1000)
            const response = await CustomAxios.delete("/pending/approve/" + id)
            return response.data
        } catch(err){
            return rejectWithValue(err.response.data)
        }
})

export const declineUser = createAsyncThunk("pending/declineUser", async (id, {
    rejectWithValue})=>{
        try{
            await timeout(1000)
            const response = await CustomAxios.delete("/pending/decline/" + id)
            return response.data
        } catch(err){
            return rejectWithValue(err.response.data)
        }
})

const pendingSlice = createSlice({
    name: "pending",
    initialState,
    reducers: {},
    extraReducers: {
        [getUsers.pending]: (state, action) => {
            return {
                ...state,
                getUsersStatus: "pending",
            }
        },
        [getUsers.fulfilled]: (state, action) => {
            return {
                ...state,
                pendingUsers: action.payload,
                getUsersStatus: "success"
            }
        },
        [getUsers.rejected]: (state, action) => {
            return {
                ...state,
                getUsersStatus: "failed",
                getUsersError: action.payload,
            }
        },
        [getUser.pending]: (state, action) => {
            return {
                ...state,
                getUserStatus: "pending",
            }
        },
        [getUser.fulfilled]: (state, action) => {
            return {
                ...state,
                pendingUser: action.payload,
                getUserStatus: "success"
            }
        },
        [getUser.rejected]: (state, action) => {
            return {
                ...state,
                getUserStatus: "failed",
                getUserError: action.payload,
            }
        },
        [addUser.pending]: (state, action) => {
            return {
                ...state,
                addUserStatus: "pending",
            }
        },
        [addUser.fulfilled]: (state, action) => {
            return {
                ...state,
                pendingUsers: [...state.pendingUsers, action.payload],
                addUserStatus: "success"
            }
        },
        [addUser.rejected]: (state, action) => {
            return {
                ...state,
                addUserStatus: "failed",
                addUserError: action.payload
            }
        },
        [declineUser.pending]: (state, action) => {
            return {
                ...state,
                declineUserStatus: "pending",
            }
        },
        [declineUser.fulfilled]: (state, action) => {
            const updatedPending = state.pendingUsers.filter((el) => el._id !== action.payload._id)
            // const updatedPending = state.pendingUsers.map((user) => user._id === action.payload._id ? null : user)
            return {
                ...state,
                pendingUsers: updatedPending,
                declineUserStatus: "success"
            }
        },
        [declineUser.rejected]: (state, action) => {
            return {
                ...state,
                declineUserStatus: "failed",
                declineUserError: action.payload
            }
        },
    }
})



export default pendingSlice.reducer;