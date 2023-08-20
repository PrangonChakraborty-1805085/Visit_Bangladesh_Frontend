import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    plan: {},
    userLocation: "",
    destinations: [],
    start_date: "",
    end_date: "",
    noOfGuests: 0,
  },
};

export const plan = createSlice({
  name: "plan",
  initialState,
  reducers: {
    setPlan: (state, action) => {
      return {
        value: {
          ...state.value,
          plan: action.payload,
        },
      };
    },
    setUserLocation: (state, action) => {
      return {
        value: {
          ...state.value,
          userLocation: action.payload,
        },
      };
    },
    addDestinations: (state, action) => {
      return {
        value: {
          ...state.value,
          destinations: [...state.value.destinations, ...action.payload],
        },
      };
    },
    removeDestinations: (state, action) => {
      return {
        value: {
          ...state.value,
          destinations: state.value.destinations.filter(
            (destination) => !action.payload.includes(destination)
          ),
        },
      };
    },
    changeStartDate: (state, action) => {
      return {
        value: {
          ...state.value,
          start_date: action.payload,
        },
      };
    },
    changeEndDate: (state, action) => {
      return {
        value: {
          ...state.value,
          end_date: action.payload,
        },
      };
    },
    setDestinations: (state, action) => {
      return {
        value: {
          ...state.value,
          destinations: action.payload,
        },
      };
    },
    setStartDate: (state, action) => {
      return {
        value: {
          ...state.value,
          start_date: action.payload,
        },
      };
    },
    setEndDate: (state, action) => {
      return {
        value: {
          ...state.value,
          end_date: action.payload,
        },
      };
    },
    setNoOfGuests: (state, action) => {
      return {
        value: {
          ...state.value,
          noOfGuests: action.payload,
        },
      };
    },
  },
});

export const {
  setPlan,
  setUserLocation,
  addDestinations,
  removeDestinations,
  changeStartDate,
  changeEndDate,
  setDestinations,
  setStartDate,
  setEndDate,
  setNoOfGuests,
} = plan.actions;

export default plan.reducer;
