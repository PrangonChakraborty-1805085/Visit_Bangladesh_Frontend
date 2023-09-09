import { createSlice } from "@reduxjs/toolkit";

const editPlanSlice = createSlice({
  name: "editPlan",
  initialState: {
    plan: null,
    date: null,
    suggestions: null,
    addedFromSuggestions: [],
  },
  reducers: {
    setEditPlan: (state, action) => {
      state.plan = action.payload.plan;
      state.date = action.payload.date;
    },
    resetEditPlan: (state) => {
      state.plan = null;
      state.date = null;
    },
    setSuggestions: (state, action) => {
      state.suggestions = action.payload.suggestions;
    },
    resetSuggestions: (state, action) => {
      state.suggestions = null;
    },
    addFromSuggestions: (state, action) => {
      state.addedFromSuggestions.push(action.payload);
    },
    resetAddedFromSuggestions: (state, action) => {
      state.addedFromSuggestions = [];
    },
  },
});

export const {
  setEditPlan,
  resetEditPlan,
  setSuggestions,
  resetSuggestions,
  addFromSuggestions,
  resetAddedFromSuggestions,
} = editPlanSlice.actions;

export default editPlanSlice.reducer;
