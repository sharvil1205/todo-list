// src/components/TodoList.js

import { useState } from 'react';
import React from 'react';
import { useGetTodosQuery, useAddTodoMutation, useMarkTodoAsCompleteMutation, useDeleteTodoMutation, useEditTodoMutation } from '../services/todos';

const TodoList = () => {
  const { data: todos, error, isLoading, refetch } = useGetTodosQuery({
    refetchInterval: 5000,
  });
  const [addNewTodo] = useAddTodoMutation();
  const [markAsComplete] = useMarkTodoAsCompleteMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [editTodo] = useEditTodoMutation();
  const [editedTitle, setEditedTitle] = useState('');
  const [editableId, setEditableId] = useState(null); 

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;

  if (error) return <div className="text-center mt-8 text-red-600">Error: {error.message}</div>;

  const handleAddTodo = async (newTodoTitle) => {
    try {
      const currentDate = new Date().toISOString().split('T')[0];
      await addNewTodo({
        title: newTodoTitle,
        completed: false,
        userId: 1,
        createdAt: currentDate,
      });
      refetch();
    } catch (error) {
      // Handle error if adding a new TODO fails
    }
  };

  const handleEditTodo = async (id, newTodoTitle) => {
    try {
      console.log(newTodoTitle);
      await editTodo({
        id: id,
        title: newTodoTitle,
      });
      refetch();
      setEditableId(null); 
    } catch (error) {
      // Handle error if editing the TODO fails
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

  const handleEditClick = (id, title) => {
    setEditableId(id);
    setEditedTitle(title); 
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-gray-100 p-4 rounded-lg shadow-md">
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between py-2 border-b">
            <span className='mr-8'>
              {todo.createdAt}
            </span>
            <button className='text-yellow-700 mr-8' 
            onClick={() => handleEditClick(todo.id, todo.title)}>Edit</button>
            <span className={`text-lg flex-1 break-all mr-8`}>
            {editableId === todo.id ? (
                <input
                  type="text"
                  value={editedTitle} 
                  onChange={(e) => setEditedTitle(e.target.value)}
                  onBlur={() => handleEditTodo(todo.id, editedTitle)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleEditTodo(todo.id, editedTitle);
                      setEditableId(null);
                    }
                  }}
                ></input>
              ) : (
                <span>{todo.title}</span>
              )}
            </span>
            <span>
              {todo.completed ? (
                <span className="text-sm text-green-500 mx-8">Completed</span>
              ) : (
                <button onClick={() => handleMarkAsComplete(todo.id)} className="text-blue-500 mr-8">
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
          className="bg-violet-500 text-white rounded-r px-4 hover:bg-violet-600 transition duration-300"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default TodoList;
