import React from 'react';
import Nav from './components/Nav';
import ToDoList from './components/ToDoList';
import './i18n';

function App() {
  return (
    <div>
      <Nav />
      <ToDoList />
    </div>
  );
}

export default App;
