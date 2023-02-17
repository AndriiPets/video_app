import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import videoReducer from "./videoSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootApp = combineReducers({ user: userReducer, video: videoReducer });

const rootReducer = (state: any, action: any) => {
  if (action.type === "user/logout") {
    state = undefined;
  }
  return rootApp(state, action);
};

const persistentReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistentReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
