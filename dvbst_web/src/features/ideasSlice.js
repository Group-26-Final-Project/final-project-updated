import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CustomAxios from '../Api/CustomAxios'

const initialState = {
    ideas: [],
    addIdeasStatus: "",
    addIdeasError: "",
    getIdeasStatus: "",
    getIdeasError: "",
    voteIdeaStatus: "",
    voteIdeaError: "",
    closed: false
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const addIdeas = createAsyncThunk("ideas/addIdeas", async (idea, {
    rejectWithValue})=>{
        try{
            await timeout(1000)
            const response = await CustomAxios.post("/ideas", idea)
            return response.data
        } catch(err){
            return rejectWithValue(err.response.data)
        }
})

export const getIdeas = createAsyncThunk("ideas/getIdeas", async (id=null, {
    rejectWithValue})=>{
        try{
            await timeout(1000)
            const response = await CustomAxios.get("/ideas")
            return response.data
        } catch(err){
            return rejectWithValue(err.response.data)
        }
})

export const voteIdea = createAsyncThunk("ideas/voteIdea", async (idea_id, {
    rejectWithValue})=>{
        try{
            const response = await CustomAxios.patch("/ideas/"+idea_id)
            return response.data
        } catch(err){
            return rejectWithValue(err.response.data)
        }
})


const ideasSlice = createSlice({
    name: "ideas",
    initialState,
    reducers: {},
    extraReducers: {
        [addIdeas.pending]: (state, action) => {
            return {
                ...state,
                addIdeasStatus: "pending",
            }
        },
        [addIdeas.fulfilled]: (state, action) => {
            return {
                ...state,
                ideas: [...state.ideas, action.payload],
                addIdeasStatus: "success"
            }
        },
        [addIdeas.rejected]: (state, action) => {
            return {
                ...state,
                addIdeasStatus: "failed",
                addIdeasError: action.payload
            }
        },
        [getIdeas.pending]: (state, action) => {
            return {
                ...state,
                getIdeasStatus: "pending",
            }
        },
        [getIdeas.fulfilled]: (state, action) => {
            return {
                ...state,
                ideas: action.payload,
                getIdeasStatus: "success"
            }
        },
        [getIdeas.rejected]: (state, action) => {
            return {
                ...state,
                getIdeasStatus: "failed",
                getIdeasError: action.payload,
            }
        },
        [voteIdea.pending]: (state, action) => {
            return {
                ...state,
                voteIdeaStatus: "pending",
            }
        },
        [voteIdea.fulfilled]: (state, action) => {
            const updatedIdea = state.ideas.map((idea) => idea._id === action.payload._id && idea.likeCount !== action.payload.likeCount ? action.payload : idea)
            return {
                ...state,
                ideas: updatedIdea,
                voteIdeaStatus: "success"
            }
        },
        [voteIdea.rejected]: (state, action) => {
            return {
                ...state,
                voteIdeaStatus: "failed",
                voteIdeaError: action.payload
            }
        },
        
    }
})

export default ideasSlice.reducer;