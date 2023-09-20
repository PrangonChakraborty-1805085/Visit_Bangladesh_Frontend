import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    plan: null,
    plans: null,
    userLocation: "",
    destinations: [],
    start_date: "",
    end_date: "",
    noOfGuests: 1,
    preferences: [],
    budget: null,
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
    //set the preferences
    setPreferences: (state, action) => {
      return {
        value: {
          ...state.value,
          preferences: action.payload,
        },
      };
    },
    //set the plans and currentPlan
    setPlans: (state, action) => {
      return {
        value: {
          ...state.value,
          plans: action.payload,
        },
      };
    },
    //set the 0th indexed plan of the plans array to the new plan from action
    setFirstPlan: (state, action) => {
      return {
        value: {
          ...state.value,
          plans: [action.payload, ...state.value.plans.slice(1)],
        },
      };
    },
    //set the 1st indexed plan of the plans array to the new plan from action
    setSecondPlan: (state, action) => {
      return {
        value: {
          ...state.value,
          plans: [state.value.plans[0], action.payload],
        },
      };
    },
    //set the budget
    setTotalBudget: (state, action) => {
      return {
        value: {
          ...state.value,
          budget: action.payload,
        },
      };
    },
    //set the type attribute to public of the plan
    setPlanPublic: (state, action) => {
      return {
        value: {
          ...state.value,
          plan: {
            ...state.value.plan,
            type: "public",
          },
        },
      };
    },
    //set the type attribute to private of the plan
    setPlanPrivate: (state, action) => {
      return {
        value: {
          ...state.value,
          plan: {
            ...state.value.plan,
            type: "private",
          },
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
  setPreferences,
  setPlans,
  setTotalBudget,
  setPlanPublic,
  setPlanPrivate,
  setFirstPlan,
  setSecondPlan,
} = plan.actions;

export default plan.reducer;
