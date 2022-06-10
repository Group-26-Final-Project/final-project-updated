import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

// const baseURL = "https://dvbst.herokuapp.com"
const baseURL = "http://localhost:8080"

const initialState = {
    pendingUsers: [],
    getUsersStatus: "",
    getUsersError: "",
    addVoterStatus: "",
    addVoterError: "",
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getUsers = createAsyncThunk("pending/getUsers", async (query, {
    rejectWithValue }) => {
    try {
        await timeout(1000)
        const response = await axios.get(baseURL + "/pending")
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})

export const addVoter = createAsyncThunk("voters/addVoter", async (id, {
    rejectWithValue})=>{
        try{
            await timeout(1000)
            const response = await axios.delete(baseURL+"/pending/" + id)
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
        [addVoter.pending]: (state, action) => {
            return {
                ...state,
                addVoterStatus: "pending",
            }
        },
        [addVoter.fulfilled]: (state, action) => {
            return {
                ...state,
                pendingUsers: [...state.pendingUsers, action.payload],
                addVoterStatus: "success"
            }
        },
        [addVoter.rejected]: (state, action) => {
            return {
                ...state,
                addVoterStatus: "failed",
                addVoterError: action.payload
            }
        },
    }
})



export default pendingSlice.reducer;