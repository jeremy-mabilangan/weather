import { combineReducers } from "@reduxjs/toolkit";
import weatherReducer from "./weather";
import { persistReducer } from "redux-persist";
import { weatherPersistConfig } from "../persist-config";

const rootReducers = combineReducers({
  weather: persistReducer(weatherPersistConfig, weatherReducer),
});

export default rootReducers;
