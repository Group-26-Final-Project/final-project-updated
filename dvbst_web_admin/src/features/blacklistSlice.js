import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CustomAxios from '../Api/CustomAxios'

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
        const response = await CustomAxios.get("/blacklist")
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