import { createSlice } from "@reduxjs/toolkit";
// createSlice is a function that creates a slice of the redux store
// it takes an object with the following properties:
// name: the name of the slice
// initialState: the initial state of the slice
// reducers: an object with the reducer functions

const initialState = { 
      user: JSON.parse(localStorage.getItem("user")) || null,

      token: localStorage.getItem("token") || null,

      isLoading: false,

      // false means not loading by default
}

const authSlice = createSlice({
      name: "auth",
      // name of this slice

      initialState,
      reducers: {
            setCredentials: (state, action) => {
                  state.user = action.payload.user
                  state.token = action.payload.token

                  localStorage.setItem("user", JSON.stringify(action.payload.user))

                  localStorage.setItem("token", action.payload.token)
            },

            logout: (state) => {
                  state.user = null
                  state.token = null

                  localStorage.removeItem("user")
                  localStorage.removeItem("token")
            },

             setLoading: (state, action) => {
            state.isLoading = action.payload
      }
      }

     
})

export const { setCredentials, logout, setLoading } = authSlice.actions

export default authSlice.reducer

