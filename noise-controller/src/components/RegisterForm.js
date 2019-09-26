import React from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import * as axios from "axios";

const StyledForm = styled(Form)`
  color: green;
  background-color: OldLace;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5em auto;
  border: 3rem solid green;
  min-height: 45vh;

  @media only screen and (max-width: 992px) {
    padding: 1em;
  }
`;

const StyledH1 = styled("h1")`
  font-size: 4rem;
  font-weight: 900;
  margin: 0 0.5rem;
  display: flex;
  justify-content: center;

  @media only screen and (max-width: 992px) {
    font-size: 2rem;
    margin: 0 auto;
    margin-top: 1rem;
  }
`;

const StyledH2 = styled("h2")`
  font-size: 3rem;
  font-weight: 600;
  margin: -0.5rem 0.5rem 0 0.5rem;
  display: flex;
  justify-content: center;

  @media only screen and (max-width: 992px) {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    margin: 0 2.5rem;
    margin-top: 1rem;
  }
`;

const Alert = styled("p")`
  min-height: 25px;
  width: 60%;
  color: red;
  font-weight: 600;
  font-style: italic;
`;

const StyledField = styled(Field)`
  height: 1.3rem;
  width: 60%;
  border: 2px solid green;
  margin: 1rem auto;
`;

const StyledSubmitButton = styled(Field)`
  height: 1.3rem;
  width: 30%;
  border: 2px solid black;
  color: white;
  background-color: green;
  margin: 0.5rem auto;

  @media only screen and (max-width: 992px) {
    width: 60%;
  }
`;

const RegisterEndpoint =
  "https://voicecontrollerbackendapi.herokuapp.com/api/teachers/register";

function UserForm({ touched, errors }) {
  // const [user, setUser] = useState({});

  return (
    // Basic form ready to take in a name, email, and password that we will
    // later send to an API in the form fo a POST request.
    <StyledForm>
      <StyledH1>New User?</StyledH1>
      <StyledH2>Sign up is easy!</StyledH2>

      {errors.username && touched.username && <Alert>{errors.username}</Alert>}
      <StyledField name="username" placeholder="Username" />

      {errors.teacher_name && touched.teacher_name && (
        <Alert>{errors.teacher_name}</Alert>
      )}
      <StyledField
        name="teacher_name"
        placeholder="What do your kids call you?"
      />

      {errors.email && touched.email && <Alert>{errors.email}</Alert>}
      <StyledField name="email" placeholder="Email" />

      {errors.password && touched.password && <Alert>{errors.password}</Alert>}
      <StyledField type="password" name="password" placeholder="Password" />

      <StyledField
        type="number"
        name="mic_sensitivity"
        placeholder="Microphone sensitivity (Recommended: 1.25 to 3.75)"
      />

      <StyledField
        type="number"
        name="animal_change_time"
        placeholder="Number of seconds between new animals"
      />

      <StyledSubmitButton type="submit" name="Submit" placeholder="Submit" />
    </StyledForm>
  );
}

export default withFormik({
  mapPropsToValues: ({
    username,
    email,
    teacher_name,
    password,
    mic_sensitivity,
    animal_change_time
  }) => {
    return {
      username: username || "",
      email: email || "",
      teacher_name: teacher_name || "",
      password: password || "",
      mic_sensitivity: mic_sensitivity || "",
      animal_change_time: animal_change_time || ""
    };
  },

  // This will send our UserForm data to the database.
  // Then, it will redirect the user to a page for the Teachers unique user ID.
  // At the time of writing this code, no POST endpoint has been declared.

  handleSubmit(values) {
    axios
      .post(RegisterEndpoint, values)
      .then(res => {
        alert("Registered! Please log in now");
        // console.log("Sent!");
        // console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  },

  // Validation Schema controls what guidelines each input field needs.
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .min(6)
      .required(
        "We would love to get to know you better. Maybe just start with your name? :)"
      ),
    email: Yup.string()
      .email("Invalid email address.")
      .required(
        "How are we supposed to send you our newsletter without your email?"
      ),
    teacher_name: Yup.string().required("Alias required."),
    password: Yup.string()
      .min(7)
      .required("Password required.")
    // classroom: Yup.string().required(
    //   "C'mon, you're a teacher... You don't have a classroom?"
    // )
  })
})(UserForm);
