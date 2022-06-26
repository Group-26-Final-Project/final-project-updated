import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CustomAxios from "../Api/CustomAxios";

const initialState = {
  electionPhase: null,
  election: null,
  // electionByID: null,
  getElectionPhaseStatus: "",
  getElectionPhaseError: "",
  getElectionStatus: "",
  getElectionError: "",
  // addElectionStatus: "",
  // addElectionError: "",
  // editElectionStatus: "",
  // editElectionError: "",
};

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getElectionPhase = createAsyncThunk(
  "election/getElectionPhase",
  async (id, { rejectWithValue }) => {
    try {
      await timeout(1000);
      const response = await CustomAxios.get("/electionPhase/" + id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const startElection = createAsyncThunk(
  "election/startElection",
  async (id, { rejectWithValue }) => {
    try {
      await timeout(1000);
      const response = await CustomAxios.post("/electionPhase/start/" + id);
      console.log(response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const pauseElection = createAsyncThunk(
  "election/pauseElection",
  async (id, { rejectWithValue }) => {
    try {
      await timeout(1000);
      const response = await CustomAxios.post("/electionPhase/pause/" + id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const endElection = createAsyncThunk(
  "election/endElection",
  async (id, { rejectWithValue }) => {
    try {
      await timeout(1000);
      const response = await CustomAxios.post("/electionPhase/end/" + id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const extendElection = createAsyncThunk(
  "election/extendElection",
  async ({ id, duration }, { rejectWithValue }) => {
    try {
      await timeout(1000);
      const response = await CustomAxios.post("/electionPhase/extend/" + id, {
        duration,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const restartElection = createAsyncThunk(
  "election/restartElection",
  async ({ id, duration }, { rejectWithValue }) => {
    try {
      await timeout(1000);
      const response = await CustomAxios.post("/electionPhase/restart/" + id, {
        duration,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const electionPhaseSlice = createSlice({
  name: "electionPhase",
  initialState,
  reducers: {},
  extraReducers: {
    [getElectionPhase.pending]: (state, action) => {
      return {
        ...state,
        getElectionPhaseStatus: "pending",
      };
    },
    [getElectionPhase.fulfilled]: (state, action) => {
      return {
        ...state,
        electionPhase: action.payload.electionStatus,
        election: action.payload.election,
        getElectionPhaseStatus: "success",
      };
    },
    [getElectionPhase.rejected]: (state, action) => {
      return {
        ...state,
        getElectionPhaseStatus: "failed",
        getEgetElectionPhaseError: action.payload,
      };
    },
    [startElection.pending]: (state, action) => {
      return {
        ...state,
        getElectionPhaseStatus: "pending",
      };
    },
    [startElection.fulfilled]: (state, action) => {
      return {
        ...state,
        electionPhase: action.payload.electionStatus,
        election: action.payload.election,
        getElectionPhaseStatus: "success",
      };
    },
    [startElection.rejected]: (state, action) => {
      return {
        ...state,
        getElectionPhaseStatus: "failed",
        getgetElectionPhaseError: action.payload,
      };
    },
    [pauseElection.pending]: (state, action) => {
      return {
        ...state,
        getElectionPhaseStatus: "pending",
      };
    },
    [pauseElection.fulfilled]: (state, action) => {
      return {
        ...state,
        electionPhase: action.payload.electionStatus,
        election: action.payload.election,
        getElectionPhaseStatus: "success",
      };
    },
    [pauseElection.rejected]: (state, action) => {
      return {
        ...state,
        getElectionPhaseStatus: "failed",
        getElectionPhaseError: action.payload,
      };
    },
    [endElection.pending]: (state, action) => {
      return {
        ...state,
        getElectionPhaseStatus: "pending",
      };
    },
    [endElection.fulfilled]: (state, action) => {
      return {
        ...state,
        electionPhase: action.payload.electionStatus,
        election: action.payload.election,
        getElectionPhaseStatus: "success",
      };
    },
    [endElection.rejected]: (state, action) => {
      return {
        ...state,
        getElectionPhaseStatus: "failed",
        getElectionPhaseError: action.payload,
      };
    },
    [extendElection.pending]: (state, action) => {
      return {
        ...state,
        getElectionPhaseStatus: "pending",
      };
    },
    [extendElection.fulfilled]: (state, action) => {
      return {
        ...state,
        electionPhase: action.payload.electionStatus,
        election: action.payload.election,
        getElectionPhaseStatus: "success",
      };
    },
    [extendElection.rejected]: (state, action) => {
      return {
        ...state,
        getElectionPhaseStatus: "failed",
        getElectionPhaseError: action.payload,
      };
    },
    [restartElection.pending]: (state, action) => {
      return {
        ...state,
        getElectionPhaseStatus: "pending",
      };
    },
    [restartElection.fulfilled]: (state, action) => {
      return {
        ...state,
        electionPhase: action.payload.electionStatus,
        election: action.payload.election,
        getElectionPhaseStatus: "success",
      };
    },
    [restartElection.rejected]: (state, action) => {
      return {
        ...state,
        getElectionPhaseStatus: "failed",
        getElectionPhaseError: action.payload,
      };
    },
  },
});

export default electionPhaseSlice.reducer;
