import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

// const baseURL = "https://dvbst.herokuapp.com"
const baseURL = "http://localhost:8080"

const initialState = {
    phase: null,
    getPhaseStatus: "",
    getPhaseError: "",
    changePhaseStatus: "",
    changePhaseError: "",
    extendPhaseStatus: "",
    extendPhaseError: "",
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getPhase = createAsyncThunk("phase/getPhase", async (phase,{
    rejectWithValue }) => {
    try {
        // await timeout(1000)
        console.log("in here");
        const response = await axios.get(baseURL + "/phase")
        return response.data.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})
export const changePhase = createAsyncThunk("phase/changePhase", async (phase,{
    rejectWithValue})=>{
        try{
            await timeout(1000)
            const response = await axios.post(baseURL+"/phase",{duration:phase})
            return response.data.data
        } catch(err){
            return rejectWithValue(err.response.data)
        }
})
export const extendPhase = createAsyncThunk("phase/extendPhase", async (endDate,{
    rejectWithValue})=>{
        try{
            console.log("endDate", endDate);
            await timeout(1000)
            const response = await axios.post(baseURL+"/phase/extend",{duration:endDate})
            return response.data.data
        } catch(err){
            return rejectWithValue(err.response.data)
        }
})
const phaseSlice = createSlice({
    name: "phase",
    initialState,
    reducers: {},
    extraReducers: {
        [getPhase.pending]: (state, action) => {
            return {
                ...state,
                getPhaseStatus: "pending",
            }
        },
        [getPhase.fulfilled]: (state, action) => {
            return {
                ...state,
                phase: action.payload,
                getPhaseStatus: "success"
            }
        },
        [getPhase.rejected]: (state, action) => {
            return {
                ...state,
                getPhaseStatus: "failed",
                getPhaseError: action.payload,
            }
        },
        [changePhase.fulfilled]: (state, action) => {
            return {
                ...state,
                phase: action.payload,
                changePhaseStatus: "success"
            }
        },
        [changePhase.rejected]: (state, action) => {
            return {
                ...state,
                changePhaseStatus: "failed",
                changePhaseError: action.payload
            }
        },
        [changePhase.pending]: (state, action) => {
            return {
                ...state,
                changePhaseStatus: "pending",
            }
        },
        [extendPhase.fulfilled]: (state, action) => {
            return {
                ...state,
                phase: action.payload,
                extendPhaseStatus: "success"
            }
        },
        [extendPhase.rejected]: (state, action) => {
            return {
                ...state,
                extendPhaseStatus: "failed",
                extendPhaseError: action.payload
            }
        },
        [extendPhase.pending]: (state, action) => {
            return {
                ...state,
                extendPhaseStatus: "pending",
            }
        },
    }
})



export default phaseSlice.reducer;