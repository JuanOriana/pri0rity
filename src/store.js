import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import taskListsReducer from "./slices/taskListsSlice";
import taskModalReducer from "./slices/taskModalSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  taskLists: taskListsReducer,
  taskModal: taskModalReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);
export { store, persistor };
