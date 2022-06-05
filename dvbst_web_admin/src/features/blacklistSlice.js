import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

// const baseURL = "https://dvbst.herokuapp.com"
const baseURL = "http://localhost:8080"

const initialState = {
    candidates: [],
    getCandidatesStatus: "",
    getCandidatesError: "",
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getCandidates = createAsyncThunk("blacklist/getCandidates", async (query, {
    rejectWithValue }) => {
    try {
        await timeout(1000)
        const response = await axios.get(baseURL + "/blacklist")
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})

const blacklistSlice = createSlice({
    name: "blacklist",
    initialState,
    reducers: {},
    extraReducers: {
        [getCandidates.pending]: (state, action) => {
            return {
                ...state,
                getCandidatesStatus: "pending",
            }
        },
        [getCandidates.fulfilled]: (state, action) => {
            return {
                ...state,
                candidates: action.payload,
                getCandidatesStatus: "success"
            }
        },
        [getCandidates.rejected]: (state, action) => {
            return {
                ...state,
                getCandidatesStatus: "failed",
                getCandidatesError: action.payload,
            }
        },
    }
})



export default blacklistSlice.reducer;