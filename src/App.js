// src/App.js

import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import TodoList from './components/TodoList';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <TodoList />
      </div>
    </Provider>
  );
}

export default App;
