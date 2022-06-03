import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

// const baseURL = "https://dvbst.herokuapp.com"
const baseURL = "http://localhost:8080"

const initialState = {
    voters: [],
    getVotersStatus: "",
    getVotersError: "",
    addVoterStatus: "",
    addVoterError: "",
    editVoterStatus: "",
    editVoterError: ""
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getVoters = createAsyncThunk("voters/getVoters", async (query, {
    rejectWithValue }) => {
    try {
        await timeout(1000)
        const response = await axios.get(baseURL + "/voters/" + query)
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})

export const addVoter = createAsyncThunk("voters/addVoter", async (voter, {
    rejectWithValue})=>{
        try{
            await timeout(1000)
            const response = await axios.post(baseURL+"/voters", voter)
            return response.data
        } catch(err){
            return rejectWithValue(err.response.data)
        }
})

export const editVoter = createAsyncThunk("voters/editVoter", async (voter, {
    rejectWithValue})=>{
        try{
            await timeout(1000)
            const response = await axios.put(baseURL+"/voters", voter)
            return response.data
        } catch(err){
            return rejectWithValue(err.response.data)
        }
})


const votersSlice = createSlice({
    name: "voters",
    initialState,
    reducers: {},
    extraReducers: {
        [getVoters.pending]: (state, action) => {
            return {
                ...state,
                getVotersStatus: "pending",
            }
        },
        [getVoters.fulfilled]: (state, action) => {
            return {
                ...state,
                voters: action.payload,
                getVotersStatus: "success"
            }
        },
        [getVoters.rejected]: (state, action) => {
            return {
                ...state,
                getVotersStatus: "failed",
                getVotersError: action.payload,
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
                voter: [...state.voter, action.payload],
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
        [editVoter.pending]: (state, action) => {
            return {
                ...state,
                editVoterStatus: "pending",
            }
        },
        [editVoter.fulfilled]: (state, action) => {
            const updatedVoters = state.voters.map((voter) => voter._id === action.payload._id ? action.payload : voter)
            return {
                ...state,
                voters: updatedVoters,
                editVoterStatus: "success"
            }
        },
        [editVoter.rejected]: (state, action) => {
            return {
                ...state,
                editVoterStatus: "failed",
                editVoterError: action.payload
            }
        },
    }
})



export default votersSlice.reducer;