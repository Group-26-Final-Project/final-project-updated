import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import CustomAxios from "../Api/CustomAxios";

const baseURL = "http://localhost:8080";
// const baseURL = "https://final-project-dvbst.herokuapp.com"

const initialState = {
  election: null,
  currentPhase: null,
  voterBalance: null,
  verifyMagicStatus: "",
  verifyMagicError: "",
  getMyElectionStatus: "",
  getMyElectionError: "",
  voteCandidateStatus: "",
  voteCandidateError: "",
  getCurrentPhaseStatus: "",
  getCurrentPhaseError: "",
  getVoterBalanceStatus: "",
  getVoterBalanceError: "",
};

export const verifyMagic = createAsyncThunk(
  "voting/verifyMagic",
  async ({ email, link }, { rejectWithValue }) => {
    console.log("Verify", email, link);
    try {
      const { data: result } = await axios.post(baseURL + "/verify", {
        email,
        link,
      });
      console.log("Verify", result);
      return result;
    } catch (err) {
      console.log("Verify error", err)
      return rejectWithValue(err.response.data);
    }
  }
);

export const getMyElection = createAsyncThunk(
  "voting/getMyElection",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await CustomAxios.get("/elections/myelection");
      console.log("My election", response);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getBalance = createAsyncThunk(
  "voting/getBalance",
  async (id, { rejectWithValue }) => {
    try {
      console.log(id);

      const response = await CustomAxios.get("/balance/" + id);
      console.log(response);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCurrentPhase = createAsyncThunk(
  "voting/getCurrentPhase",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await CustomAxios.get("/phase");
      console.log(response.data.data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const voteCandidate = createAsyncThunk(
  "voting/voteCandidate",
  async ({ electionId, candidateId, voterId }, { rejectWithValue }) => {
    try {
        console.log("Vote", electionId, candidateId, voterId);
      const response = await axios.patch(baseURL + "/elections", {
        electionId,
        candidateId,
        voterId,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const votingSlice = createSlice({
  name: "voting",
  initialState,
  reducers: {},
  extraReducers: {
    [verifyMagic.pending]: (state, action) => {
      return {
        ...state,
        verifyMagicStatus: "pending",
      };
    },
    [verifyMagic.fulfilled]: (state, action) => {
      return {
        ...state,
        verifyMagicStatus: "success",
      };
    },
    [verifyMagic.rejected]: (state, action) => {
      return {
        ...state,
        verifyMagicStatus: "failed",
        verifyMagicError: action.payload,
      };
    },
    [getMyElection.pending]: (state, action) => {
      return {
        ...state,
        getMyElectionStatus: "pending",
      };
    },
    [getMyElection.fulfilled]: (state, action) => {
      return {
        ...state,
        election: action.payload,
        getMyElectionStatus: "success",
      };
    },
    [getMyElection.rejected]: (state, action) => {
      return {
        ...state,
        getMyElectionStatus: "failed",
        getMyElectionError: action.payload,
      };
    },
    [getCurrentPhase.pending]: (state, action) => {
      return {
        ...state,
        getCurrentPhaseStatus: "pending",
      };
    },
    [getCurrentPhase.fulfilled]: (state, action) => {
      return {
        ...state,
        currentPhase: action.payload,
        getCurrentPhaseStatus: "success",
      };
    },
    [getCurrentPhase.rejected]: (state, action) => {
      return {
        ...state,
        getCurrentPhaseStatus: "failed",
        getCurrentPhaseError: action.payload,
      };
    },
    [getBalance.pending]: (state, action) => {
      return {
        ...state,
        getVoterBalanceStatus: "pending",
      };
    },
    [getBalance.fulfilled]: (state, action) => {
      return {
        ...state,
        voterBalance: action.payload,
        getVoterBalanceStatus: "success",
      };
    },
    [getBalance.rejected]: (state, action) => {
      return {
        ...state,
        getVoterBalanceStatus: "failed",
        getVoterBalanceError: action.payload,
      };
    },
    [voteCandidate.pending]: (state, action) => {
      return {
        ...state,
        voteCandidateStatus: "pending",
      };
    },
    [voteCandidate.fulfilled]: (state, action) => {
      return {
        ...state,
        voteCandidateStatus: "success",
      };
    },
    [voteCandidate.rejected]: (state, action) => {
      return {
        ...state,
        voteCandidateError: action.payload,
      };
    },
  },
});

export default votingSlice.reducer;
