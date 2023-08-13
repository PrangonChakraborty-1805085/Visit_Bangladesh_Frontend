import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
// import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'
import planReducer from "./features/plan-slice";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  // storageSession,
  storage,
};
const persistedPlanReducer = persistReducer(persistConfig, planReducer);
export const store = configureStore({
  reducer: {
    persistedPlanReducer,
  },
  middleware: [thunk],
});
export const persistor = persistStore(store);
