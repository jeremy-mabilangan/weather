import { createSlice } from "@reduxjs/toolkit";

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: undefined,
  },
  reducers: {
    /**
     * Set the data from Weather API
     */
    setWeatherForecastData: (state, action) => ({
      ...state,
      data: action.payload,
    }),
  },
});

export const { setWeatherForecastData } = weatherSlice.actions;

export default weatherSlice.reducer;
