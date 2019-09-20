import React from "react";
import { Route, Link } from "react-router-dom";

import Header from "./components/Header";
import Nav from "./components/Nav";
import RegisterForm from "./components/RegisterForm";
import "./App.css";

function App() {
  return (
    <div>
      <Link to="/">Home</Link>
      {/* Adding a link to /login from the front page; later this could be moved into a navbar or elsewhere */}
      <Link to="/register">Register</Link>

      {/* RegisterForm will display at paths containing "/login" */}
      <Route path="/register" component={RegisterForm} />
    </div>
  );
}

export default App;
