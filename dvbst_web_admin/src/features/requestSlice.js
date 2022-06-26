import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CustomAxios from "../Api/CustomAxios";

const initialState = {
  requests: [],
  getRequestsStatus: "",
  getRequestsError: "",
  isLoading: false,
};

export const getRequests = createAsyncThunk(
  "getRequests",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await CustomAxios.get("/requests");
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const updateRequests = createAsyncThunk(
  "updateRequests",
  async (query, { rejectWithValue }) => {
    try {
      let data;
      if (query.action === "approve") {
        data = await CustomAxios.patch("/requests/approve/" + query.id);
      } else {
        data = await CustomAxios.patch("/requests/reject/" + query.id);
      }
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {},
  extraReducers: {
    [getRequests.pending]: (state, action) => {
      return {
        ...state,
        isLoading: true,
        getRequestsStatus: "pending",
      };
    },
    [getRequests.fulfilled]: (state, action) => {
      console.log("action.payload", action.payload);
      return {
        ...state,
        isLoading: false,
        requests: action.payload.data,
        getRequestsStatus: "success",
      };
    },
    [getRequests.rejected]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        getRequestsStatus: "failed",
        getRequestsError: action.payload,
      };
    },
    [updateRequests.pending]: (state, action) => {
      return {
        ...state,
        isLoading: true,
        getRequestsStatus: "pending",
      };
    },
    [updateRequests.fulfilled]: (state, action) => {
      state.requests = state.requests.map((request) => {
        if (request.id === action.payload.data.id) {
          return action.payload.data;
        }
        return request;
      });
      return {
        ...state,
        isLoading: false,
        requests: state.requests,
        getRequestsStatus: "success",
      };
    },
    [updateRequests.rejected]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        getRequestsStatus: "failed",
        getRequestsError: action.payload,
      };
    },
  },
});

export default requestsSlice.reducer;
