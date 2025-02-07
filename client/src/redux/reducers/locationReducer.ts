// locationSlice.js
import { createSlice } from '@reduxjs/toolkit';


interface LocationState {
    latitude: string,
    longitude: string,
}
const initialState : LocationState ={
    latitude: '',
    longitude: '',
}
const locationSlice = createSlice({
  name: 'location',
  initialState: {
    locationData: initialState,
  },
  reducers: {
    addLocation: (state, action) => {
        state.locationData = action.payload
    },
    removeLocation: (state, action) => {
        state.locationData = initialState;
    }
  },
});




export const locationReducer = locationSlice.reducer;
export const { addLocation,removeLocation } = locationSlice.actions;
export const locationSelector = (state: any) => state.locationReducer.locationData; 