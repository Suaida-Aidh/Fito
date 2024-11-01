import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice'
import subscriptionReducer from '../slices/subscriptionSlice'
import trainerReducer from '../slices/trainerSlice'
export const store = configureStore({
    reducer :{
        auth : authReducer,
        subscriptions: subscriptionReducer,
        trainers: trainerReducer,
        
    },
});