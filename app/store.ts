// store.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import shoppingReducer from "./features/shoppingSlice";

const persistenceConfig = {
  key: "shopping-root",
  storage: AsyncStorage,
  whitelist: ["shopping"],
};

const reducer = combineReducers({
  shopping: shoppingReducer,
});

const persistedReducer = persistReducer(persistenceConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
