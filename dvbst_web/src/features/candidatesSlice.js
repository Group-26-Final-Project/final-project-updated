import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CustomAxios from '../Api/CustomAxios'

const initialState = {
    getCandidateStatus: "",
    getCandidateError: "",
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getCandidates = createAsyncThunk("candidates/getCandidates", async (id = null, {
    rejectWithValue }) => {
    try {
        await timeout(1000)
        const response = await CustomAxios.get("/candidates")
        console.log("response data ----", response)
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



export default candidatesSlice.reducer;