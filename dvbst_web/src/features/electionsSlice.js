import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CustomAxios from '../Api/CustomAxios'

const baseURL = "http://localhost:8080"
// const baseURL = "https://final-project-dvbst.herokuapp.com"


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
            const response = await CustomAxios.get("/elections")
            return response.data
        } catch(err){
            return rejectWithValue(err.response.data)
        }
})

export const getElectionResult = createAsyncThunk("elections/getElectionResult", async (electionId, {
    rejectWithValue})=>{
        try{
            await timeout(1000)
            const response = await CustomAxios.get("/results/" + electionId)
            return response.data
        } catch(err){
            return rejectWithValue(err.response.data)
        }
})

export const renderElectionResult = createAsyncThunk("elections/renderElectionResult", async (election, {
    rejectWithValue})=>{
        try{
            // await timeout(1000)
            // const response = await CustomAxios.get(baseURL+"/results/" + electionId)
            const response = election.sort((a, b) => a.voteCount < b.voteCount ? 1 : -1)
            return response
        } catch(err){
            return rejectWithValue("Somethings off")
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
        [renderElectionResult.pending]: (state, action) => {
            return {
                ...state,
                getElectionResultStatus: "pending",
            }
        },
        [renderElectionResult.fulfilled]: (state, action) => {
            return {
                ...state,
                election: action.payload,
                getElectionResultStatus: "success"
            }
        },
        [renderElectionResult.rejected]: (state, action) => {
            return {
                ...state,
                getElectionResultStatus: "failed",
                getElectionResultError: action.payload,
            }
        },
        
    }
})

export default electionsSlice.reducer;