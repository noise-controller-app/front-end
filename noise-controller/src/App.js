import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import TeacherPage from "./components/TeacherPage";
import Forms from "./components/Forms";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Forms} />
          {/* <TeacherPage minute={minute} second={second} toggleButton={toggleButton} /> */}
          <Route exact path="/teacher/:id" component={TeacherPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
