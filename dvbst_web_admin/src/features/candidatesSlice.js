import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CustomAxios from '../Api/CustomAxios'

const initialState = {
    candidates: [],
    getCandidatesStatus: "",
    getCandidatesError: "",
    addCandidateStatus: "",
    addCandidateError: "",
    editCandidateStatus: "",
    editCandidateError: "",
    disqualifyCandidatesStatus: "",
    disqualifyCandidatesError: "",
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getCandidates = createAsyncThunk("candidates/getCandidates", async (query, {
    rejectWithValue }) => {
    try {
        // await timeout(1000)
        console.log("ezih gebahu",query)
        const response = await CustomAxios.get("/candidates?query=" + query);
        return response.data
    } catch (err) {
        console.log("Candidate", err)
        return rejectWithValue(err.response.data)
    }
})

export const addCandidate = createAsyncThunk("candidates/addCandidate", async (candidate, {
    rejectWithValue})=>{
        try{
            await timeout(1000)
            const response = await CustomAxios.post("/candidates", candidate)
            return response.data
        } catch(err){
            return rejectWithValue(err.response.data)
        }
})

export const editCandidate = createAsyncThunk("candidates/editCandidate", async (candidate, {
    rejectWithValue})=>{
        try{
            await timeout(1000)
            const response = await CustomAxios.put("/candidates", candidate)
            return response.data
        } catch(err){
            return rejectWithValue(err.response.data)
        }
})

export const disqualifyCandidate = createAsyncThunk("candidates/disqualifyCandidate", async (id, {
    rejectWithValue})=>{
        try{
            await timeout(1000)
            const response = await CustomAxios.delete("/candidates/" + id)
            return response.data
        } catch(err){
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
        [addCandidate.pending]: (state, action) => {
            return {
                ...state,
                addCandidateStatus: "pending",
            }
        },
        [addCandidate.fulfilled]: (state, action) => {
            return {
                ...state,
                candidates: [...state.candidates, action.payload],
                addCandidateStatus: "success"
            }
        },
        [addCandidate.rejected]: (state, action) => {
            return {
                ...state,
                addCandidateStatus: "failed",
                addCandidateError: action.payload
            }
        },
        [editCandidate.pending]: (state, action) => {
            return {
                ...state,
                editCandidateStatus: "pending",
            }
        },
        [editCandidate.fulfilled]: (state, action) => {
            const updatedCandidates = state.candidates.map((candidate) => candidate._id === action.payload._id ? action.payload : candidate)
            return {
                ...state,
                candidates: updatedCandidates,
                editCandidateStatus: "success"
            }
        },
        [editCandidate.rejected]: (state, action) => {
            return {
                ...state,
                editCandidateStatus: "failed",
                editCandidateError: action.payload
            }
        },
        [disqualifyCandidate.pending]: (state, action) => {
            return {
                ...state,
                disqualifyCandidatesStatus: "pending",
            }
        },
        [disqualifyCandidate.fulfilled]: (state, action) => {
            return {
                ...state,
                candidates: state.candidates.filter((el) => el.id !== action.payload._id),
                disqualifyCandidatesStatus: "success"
            }
        },
        [disqualifyCandidate.rejected]: (state, action) => {
            return {
                ...state,
                disqualifyCandidatesStatus: "failed",
                disqualifyCandidatesError: action.payload
            }
        },
    }
})



export default candidatesSlice.reducer;