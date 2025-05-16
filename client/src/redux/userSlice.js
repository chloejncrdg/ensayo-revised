import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    currentUser: null,
    loading: false,
    error: false,
}


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
        state.loading = true
    },
    loginSuccess: (state, action) => {
        state.loading = false
        state.currentUser = action.payload
        state.tokenExpiresAt = action.payload.tokenExpiresAt
    },
    loginFailure: (state) => {
        state.loading = false
        state.error = true
    },
    logout: (state) => {
        state.currentUser = null
        state.loading = false
        state.error = false
        state.registrationStatus = false;
    },
    // update enrolled courses
    updateEnrolledCourses: (state, action) => {
        state.currentUser = {
          ...state.currentUser,
          enrolledCourses: [...state.currentUser.enrolledCourses, action.payload],
        };
    },
    updateUserProfile: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
    updateUser: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        ...action.payload, // Update user properties (e.g., isVerified)
      };
    },
    setRegistrationStatus: (state, action) => {
      state.registrationStatus = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, loginFailure, logout, updateEnrolledCourses, updateUserProfile, updateUser, setRegistrationStatus } = userSlice.actions
export default userSlice.reducer
