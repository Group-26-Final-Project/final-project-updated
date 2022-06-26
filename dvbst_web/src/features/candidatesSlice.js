import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CustomAxios from '../Api/CustomAxios'

const initialState = {
    candidate: null,
    candidates: [],
    getCandidateStatus: "",
    getCandidateError: "",
    getCandidatesStatus: "",
    getCandidatesError: "",
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getCandidate = createAsyncThunk("candidates/getCandidate", async (id, {
    rejectWithValue }) => {
    try {
        await timeout(1000)
        const response = await CustomAxios.get("/candidates/" + id)
        console.log("response data ----", response)
        return response.data.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})

export const getCandidates = createAsyncThunk("candidates/getCandidates", async (id = null, {
    rejectWithValue }) => {
    try {
        await timeout(1000)
        const response = await CustomAxios.get("/candidates")
        console.log("Candidates", response.data)
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})

const candidatesSlice = createSlice({
    name: "candidates",
    initialState,
    reducers: {},
    extraReducers: {
        [getCandidate.pending]: (state, action) => {
            return {
                ...state,
                getCandidateStatus: "pending",
            }
        },
        [getCandidate.fulfilled]: (state, action) => {
            return {
                candidate: action.payload,
                getCandidateStatus: "success"
            }
        },
        [getCandidate.rejected]: (state, action) => {
            return {
                getCandidateStatus: "failed",
                getCandidateError: action.payload,
            }
        },
        [getCandidates.pending]: (state, action) => {
            return {
                ...state,
                getCandidatesStatus: "pending",
            }
        },
        [getCandidates.fulfilled]: (state, action) => {
            return {
                candidates: action.payload,
                getCandidatesStatus: "success"
            }
        },
        [getCandidates.rejected]: (state, action) => {
            return {
                getCandidatesStatus: "failed",
                getCandidatesError: action.payload,
            }
        },
    }
})



export default candidatesSlice.reducer;