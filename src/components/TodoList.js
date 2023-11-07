// src/components/TodoList.js

import React from 'react';
import { useGetTodosQuery, useAddTodoMutation, useMarkTodoAsCompleteMutation, useDeleteTodoMutation } from '../services/todos';
import { useQueryClient } from 'react-query';

const TodoList = () => {
  const { data: todos, error, isLoading, isFetching, refetch } = useGetTodosQuery({
    refetchInterval: 5000,
  });
  const [addNewTodo] = useAddTodoMutation();
  const [markAsComplete] = useMarkTodoAsCompleteMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;

  if (error) return <div className="text-center mt-8 text-red-600">Error: {error.message}</div>;

  const handleAddTodo = async (newTodoTitle) => {
    try {
      const currentDate = new Date().toISOString().split('T')[0];
      await addNewTodo({
        title: newTodoTitle,
        completed: false,
        userId: 1,
        createdAt:currentDate,
      });
      refetch();
    } catch (error) {
      // Handle error if adding a new TODO fails
    }
  };

  const handleMarkAsComplete = async (id) => {
    try {
      await markAsComplete(id);
      refetch();
    } catch (error) {
      // Handle error if marking task as complete fails
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      refetch();
    } catch (error) {
      // Handle error if deleting the task fails
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-gray-100 p-4 rounded-lg shadow-md">
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between py-2 border-b">
            <span className='mr-8'>
              {todo.createdAt}
            </span>
            <span className={`text-lg flex-1 break-all mr-8`}>
              {todo.title}
            </span>
            <span>
              {todo.completed ? (
                <span className="text-sm text-green-500">Completed</span>
              ) : (
                <button onClick={() => handleMarkAsComplete(todo.id)} className="text-blue-500">
                  Mark Complete
                </button>
              )}
              <button onClick={() => handleDeleteTodo(todo.id)} className="text-red-500 ml-2">
                Delete
              </button>
            </span>
          </li>
        ))}
      </ul>

      <div className="flex mt-4">
        <input
          type="text"
          placeholder="Enter new TODO"
          onKeyPress={(e) => {
            if (e.key === 'Enter' && e.target.value.trim() !== '') {
              handleAddTodo(e.target.value);
              e.target.value = '';
            }
          }}
          className="border rounded-l py-2 px-4 w-full focus:outline-none"
        />
        <button
          onClick={() => {
            const input = document.querySelector('input');
            if (input.value.trim() !== '') {
              handleAddTodo(input.value);
              input.value = '';
            }
          }}
          className="bg-blue-500 text-white rounded-r px-4 hover:bg-blue-600 transition duration-300"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default TodoList;
