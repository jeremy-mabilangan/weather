import storage from "redux-persist/lib/storage";

export const weatherPersistConfig = {
  key: "weather",
  storage,
  whitelist: ["data"],
};
