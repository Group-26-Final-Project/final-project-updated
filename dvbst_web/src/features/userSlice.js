import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

const baseURL = "https://1d10-197-156-103-47.eu.ngrok.io"

const initialState = {
    user: null,
    addUserStatus: "",
    addUserError: ""
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const addUser = createAsyncThunk("user/addUser", async (user, {
    rejectWithValue})=>{
        try{
            await timeout(1000)
            const response = await axios.post(baseURL+"/users", user)
            return response.data
        } catch(err){
            return rejectWithValue(err.response.data)
        }
})

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: {
        [addUser.pending]: (state, action) => {
            return {
                ...state,
                addIdeasStatus: "pending",
            }
        },
        [addUser.fulfilled]: (state, action) => {
            return {
                ...state,
                user: action.payload,
                addUserStatus: "success"
            }
        },
        [addUser.rejected]: (state, action) => {
            return {
                ...state,
                addUserStatus: "failed",
                addUserError: action.payload
            }
        },
    }
})

export default userSlice.reducer;