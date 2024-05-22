// src/state/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Example reducer

const rootReducer = combineReducers({
  user: userReducer,
  // other reducers can be added here
});

export const store = configureStore({
  reducer: rootReducer,
});
