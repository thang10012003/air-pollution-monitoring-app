import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import {locationReducer} from "./reducers/locationReducer";
const store = configureStore({
    reducer: {
        authReducer,
        locationReducer,
    },
})

export default store