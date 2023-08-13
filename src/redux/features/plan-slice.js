import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    plan: {},
  },
};
export const plan = createSlice({
  name: "plan",
  initialState,
  reducers: {
    setPlan: (state, action) => {
      // console.log('plan to be dispatched : ',action.payload);
      return {
        value: {
          plan: action.payload,
        },
      };
    },
  },
});

export const { setPlan } = plan.actions;
export default plan.reducer;
