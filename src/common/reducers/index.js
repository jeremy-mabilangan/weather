import { combineReducers } from "@reduxjs/toolkit";
import weatherReducer from "./weather";

const rootReducers = combineReducers({
  weather: weatherReducer,
});

export default rootReducers;
