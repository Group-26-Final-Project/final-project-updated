import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CustomAxios from '../Api/CustomAxios'

const initialState = {
    elections: [],
    getElectionsStatus: "",
    getElectionsError: "",
    addElectionStatus: "",
    addElectionError: "",
    editElectionStatus: "",
    editElectionError: "",
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getElections = createAsyncThunk("elections/getElections", async (id=null, {
    rejectWithValue }) => {
    try {
        await timeout(1000)
        const response = await CustomAxios.get("/elections")
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})

export const addElection = createAsyncThunk("elections/addElection", async (election, {
    rejectWithValue})=>{
        try{
            await timeout(1000)
            const response = await CustomAxios.post("/elections", election)
            return response.data
        } catch(err){
            return rejectWithValue(err.response.data)
        }
})

export const editElection = createAsyncThunk("elections/editElection", async (election, {
    rejectWithValue})=>{
        try{
            await timeout(1000)
            const response = await CustomAxios.put("/elections", election)
            return response.data
        } catch(err){
            return rejectWithValue(err.response.data)
        }
})

const electionSlice = createSlice({
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
                getElectionsError: action.payload,
            }
        },
        [addElection.pending]: (state, action) => {
            return {
                ...state,
                addElectionStatus: "pending",
            }
        },
        [addElection.fulfilled]: (state, action) => {
            return {
                ...state,
                elections: [...state.elections, action.payload],
                addElectionStatus: "success"
            }
        },
        [addElection.rejected]: (state, action) => {
            return {
                ...state,
                addElectionStatus: "failed",
                addElectionError: action.payload
            }
        },
        [editElection.pending]: (state, action) => {
            return {
                ...state,
                editElectionStatus: "pending",
            }
        },
        [editElection.fulfilled]: (state, action) => {
            const updatedElections = state.elections.map((election) => election._id === action.payload._id ? action.payload : election)
            return {
                ...state,
                elections: updatedElections,
                editElectionStatus: "success"
            }
        },
        [editElection.rejected]: (state, action) => {
            return {
                ...state,
                editElectionStatus: "failed",
                editElectionError: action.payload
            }
        },
    }
})



export default electionSlice.reducer;