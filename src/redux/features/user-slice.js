import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  profilePicture: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setProfilePicture: (state, action) => {
      state.profilePicture = action.payload;
    },
  },
});

export const { setUsername, setEmail, setProfilePicture } = userSlice.actions;

export default userSlice.reducer;
