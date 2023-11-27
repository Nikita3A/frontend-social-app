import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isLoading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload; // 1
      // state.user = action.payload.user; 2
      // 3
      // state.currentUser = action.payload.user; 
      // state.accessToken = action.payload.accessToken;
      // state.refreshToken = action.payload.refreshToken;
    },

    updateTokens: (state, action) => {
      state.currentUser.accessToken = action.payload.accessToken;
      state.currentUser.refreshToken = action.payload.refreshToken;
    },

    loginFailed: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    logout: (state) => {
      return initialState;
    },
    changeProfile: (state, action) => {
      state.currentUser.profilePicture = action.payload;
    },
    following: (state, action) => {
      if (state.currentUser.following.includes(action.payload)) {
        state.currentUser.following.splice(
          state.currentUser.following.findIndex(
            (followingId) => followingId === action.payload
          )
        );
      } else {
        state.currentUser.following.push(action.payload);
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  logout,
  changeProfile,
  following,
  updateTokens,
} = userSlice.actions;

export default userSlice.reducer;