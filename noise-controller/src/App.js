import React from "react";
import { Route, Link } from "react-router-dom";

import Header from "./components/Header";
import Nav from "./components/Nav";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import "./App.css";

function App() {
  return (
    <div>
      <Link to="/">Home</Link>
      {/* Adding a link to /register from the front page; later this could be moved into a navbar or elsewhere */}
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>

      {/* RegisterForm will display at paths containing "/register" */}
      <Route path="/register" component={RegisterForm} />
      <Route path="/login" component={LoginForm} />
    </div>
  );
}

export default App;
