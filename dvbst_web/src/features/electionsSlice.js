import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

const baseURL = "https://final-project-dvbst.herokuapp.com"


const initialState = {
    elections: [],
    election: null,
    getElectionsStatus: "",
    getElectionsError: "",
    getElectionResultStatus: "",
    getElectionResultError: "",
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getElections = createAsyncThunk("elections/getElections", async (id=null, {
    rejectWithValue})=>{
        try{
            await timeout(1000)
            const response = await axios.get(baseURL+"/elections")
            return response.data
        } catch(err){
            return rejectWithValue(err.response.data)
        }
})

export const getElectionResult = createAsyncThunk("elections/getElectionResult", async (electionId, {
    rejectWithValue})=>{
        try{
            await timeout(1000)
            const response = await axios.get(baseURL+"/results/" + electionId)
            return response.data
        } catch(err){
            return rejectWithValue(err.response.data)
        }
})

const electionsSlice = createSlice({
    name: "elections",
    initialState,
    reducers: {},
    extraReducers: {
        [getElections.pending]: (state, action) => {
            return {
                ...state,
                getElectionsStatus: "pending",
            }
        },
        [getElections.fulfilled]: (state, action) => {
            return {
                ...state,
                elections: action.payload,
                getElectionsStatus: "success"
            }
        },
        [getElections.rejected]: (state, action) => {
            return {
                ...state,
                getElectionsStatus: "failed",
                getElectionsError: action.payload
            }
        },
        [getElectionResult.pending]: (state, action) => {
            return {
                ...state,
                getElectionResultStatus: "pending",
            }
        },
        [getElectionResult.fulfilled]: (state, action) => {
            return {
                ...state,
                election: action.payload,
                getElectionResultStatus: "success"
            }
        },
        [getElectionResult.rejected]: (state, action) => {
            return {
                ...state,
                getElectionResultStatus: "failed",
                getElectionResultError: action.payload,
            }
        },
    }
})

export default electionsSlice.reducer;