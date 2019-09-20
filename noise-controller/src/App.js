import React from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import UserForm from './components/UserForm';
import './App.css';
import LoginForm from './components/Login';

function App() {
  return (
    <div>
      <UserForm />

      <LoginForm />
    </div>
  );
}

export default App;