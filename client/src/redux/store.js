import { configureStore } from "@reduxjs/toolkit";
// configureStore creates the redux store


import authReducer from "./slices/authSlice.js"
//import auth reducer - handles login/logout state

const store = configureStore({
      reducer: {
            auth: authReducer,
            //auth is the name we use to access this state 
            // like store.auth.user, store.auth.token
      }
})

export default store