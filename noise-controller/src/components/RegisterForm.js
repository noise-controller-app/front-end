import React, { useState, useEffect } from "react";
import Formik, { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import axios from "axios";

const Alert = styled.p`
  min-height: 25px;
  width: 60%;
  background-color: pink;
  color: red;
`;

const StyledForm = styled(Form)`
  color: green;
  width: 30%;
  display: flex;
  flex-direction: column;
  min-height: 45vh;
  justify-content: space-between;
  align-items: center;
  margin: 40px auto;
  padding-bottom: 40px;
  border: 65px solid green;
`;

const StyledField = styled(Field)`
  height: 1.3rem;
  width: 60%;
  border: 2px solid green;
`;

const StyledSubmitButton = styled(Field)`
  height: 1.3rem;
  width: 30%;
  border: 2px solid black;
  color: white;
  background-color: green;
`;

function UserForm({ touched, errors }) {
  const [user, setUser] = useState();

  useEffect(() => {
    // Do stuff
  }, [user]);

  return (
    //Basic form ready to take in a name, email, and password that we will
    // later send to an API in the form fo a POST request.
    <StyledForm>
      <h1>'Welcome to ___!'</h1>

      {errors.name && touched.name && <Alert>{errors.name}</Alert>}
      <StyledField name="name" placeholder="Name" />

      {errors.email && touched.email && <Alert>{errors.email}</Alert>}
      <StyledField name="email" placeholder="Email" />

      {errors.password && touched.password && <Alert>{errors.password}</Alert>}
      <StyledField name="password" placeholder="Password" />

      {errors.classroom && touched.classroom && (
        <Alert>{errors.classroom}</Alert>
      )}
      <StyledField name="classroom" placeholder="Classroom Name" />

      <StyledSubmitButton type="submit" name="Submit" placeholder="Submit" />
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
  },
  // This will send our UserForm data to the database.

  // handleSubmit(values) => {
  //     axios.post('', values)
  //         .then((res) => {
  //             console.log(res);
  //         })
  // }

  // Validation Schema controls what guidelines each input field needs.
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .min(6)
      .required(
        "We would love to get to know you better. Maybe just start with your name? :)"
      ),
    email: Yup.string()
      .email("Invalid email address.")
      .required(
        "How are we supposed to send you our newsletter without your email?"
      ),
    password: Yup.string()
      .min(7)
      .required("Password required."),
    classroom: Yup.string().required(
      "C'mon, you're a teacher... You don't have a classroom?"
    )
  })
})(UserForm);
