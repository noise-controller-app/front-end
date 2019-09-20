import React, { useState, useEffect } from "react";
import Formik, { Form, Field, withFormik } from "formik";
import styled from "styled-components";
import axios from "axios";

const StyledForm = styled(Form)`
  color: green;
  width: 30%;
  display: flex;
  flex-direction: column;
  min-height: 45vh;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  padding-bottom: 40px;
  border: 65px solid green;
`;

const StyledField = styled(Field)`
  height: 1.3rem;
  width: 60%;
  border: 2px solid green;
`;

function RegisterForm() {
  const [user, setUser] = useState();

  useEffect(() => {
    // Do stuff
  }, [user]);

  return (
    //Basic form ready to take in a name, email, and password that we will
    // later send to an API in the form fo a POST request.
    <StyledForm>
      <h1>'Welcome to ___!'</h1>
      <StyledField name="name" placeholder="Name" />
      <StyledField name="email" placeholder="Email" />
      <StyledField name="password" placeholder="Password" />
      <StyledField name="classroom" placeholder="Classroom Name" />
    </StyledForm>
  );
}

export default withFormik({
  mapPropsToValues: ({ name, email, password, classroom }) => {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      classroom: classroom || ""
    };
  }
})(RegisterForm);
