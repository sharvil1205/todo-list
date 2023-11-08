// src/services/todos.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => 'http://localhost:3500/todos',
      provides: ['Todo'],
    }),
    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: 'http://localhost:3500/todos',
        method: 'POST',
        body: newTodo,
      }),
      invalidatesTags: ['Todo'],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `http://localhost:3500/todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todo'],
    }),

    markTodoAsComplete: builder.mutation({
      query: (id) => ({
        url: `http://localhost:3500/todos/${id}`,
        method: 'PATCH', 
        body: { completed: true }, 
      }),
      invalidatesTags: ['Todo'],
    }),

    editTodo: builder.mutation({
      query: ({ id, title }) => ({
        url: `http://localhost:3500/todos/${id}`,
        method: 'PATCH',
        body: { title },
      }),
      invalidatesTags: ['Todo'],
    }),
    
  }),
});

export const { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation, useMarkTodoAsCompleteMutation, useEditTodoMutation } = todosApi;