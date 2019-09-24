import React from "react";
import { Route, Link } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import styled from 'styled-components';
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/Login";
import TeacherPage from './components/TeacherPage';

const Page = styled.div `
  display: flex;
`

function App() {
  return (
    <div>
      <Page>
        <RegisterForm />
        <LoginForm />
      </Page>

      {/* <Route path='/teacher/:id' component={TeacherPage} /> */}
    </div>
  );
}

export default App;