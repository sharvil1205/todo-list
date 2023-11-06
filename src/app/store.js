// src/app/store.js

import { configureStore } from '@reduxjs/toolkit';
import { todosApi } from '../services/todos';
import todosReducer from '../features/todosSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    [todosApi.reducerPath]: todosApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todosApi.middleware),
});
