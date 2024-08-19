import { createSlice } from "@reduxjs/toolkit";

export const MatchUpSlice = createSlice({
  initialState: {
    matches: [],
    selectedUser: {},
    isLoading: null,
    isError: null,
  },
  name: "matchup",

  reducers: {
    GetMatches() {},
    GetSingleMatch() {},
  },
});

export const MatchUpAction = MatchUpSlice.actions;
