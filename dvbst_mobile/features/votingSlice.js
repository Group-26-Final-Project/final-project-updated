import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import CustomAxios from "../Api/CustomAxios";
import { getData } from "../Api/RetrieveToken";
const baseURL = "https://bfaf-197-156-111-220.eu.ngrok.io";
// const baseURL = "https://final-project-dvbst.herokuapp.com"

const initialState = {
  election: null,
  currentPhase: null,
  sendOTPStatus: "",
  sendOTPError: "",
  verifyOTPStatus: "",
  verifyOTPError: "",
  getMyElectionStatus: "",
  getMyElectionError: "",
  voteCandidateStatus: "",
  voteCandidateError: "",
  getCurrentPhaseStatus: "",
  getCurrentPhaseError: "",
};

export const sendOTP = createAsyncThunk(
  "voting/sendOTP",
  async (email, { rejectWithValue }) => {
    console.log("Send", email);
    try {
      const { data: result } = await CustomAxios.post("/verify/mobile", {
        email
      });
      return result;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "voting/verifyOTP",
  async ({ email, otp }, { rejectWithValue }) => {
    // console.log("Verify", email, otp);
    try {
      const { data: result } = await CustomAxios.post("/verify/otp", {
        email,
        otp,
      });
      return result;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getMyElection = createAsyncThunk(
  "voting/getMyElection",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await CustomAxios.get("/elections/myelection", {
        headers: {
          Authorization: 'Bearer ' + await getData()  //the token is a variable which holds the token
        }
      });
      return response.data;
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

const votingSlice = createSlice({
  name: "voting",
  initialState,
  reducers: {},
  extraReducers: {
    [sendOTP.pending]: (state, action) => {
      return {
        ...state,
        sendOTPStatus: "pending",
      };
    },
    [sendOTP.fulfilled]: (state, action) => {
      return {
        ...state,
        sendOTPStatus: "success",
      };
    },
    [sendOTP.rejected]: (state, action) => {
      return {
        ...state,
        sendOTPStatus: "failed",
        sendOTPError: action.payload,
      };
    },
    [verifyOTP.pending]: (state, action) => {
      return {
        ...state,
        verifyOTPStatus: "pending",
      };
    },
    [verifyOTP.fulfilled]: (state, action) => {
      return {
        ...state,
        verifyOTPStatus: "success",
      };
    },
    [verifyOTP.rejected]: (state, action) => {
      return {
        ...state,
        verifyOTPStatus: "failed",
        verifyOTPError: action.payload,
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
