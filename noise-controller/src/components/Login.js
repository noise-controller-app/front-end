import React from "react";
import { Form, Field, withFormik } from "formik";
import { withRouter } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import styled from "styled-components";

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

const StyledH3 = styled("h3")`
  font-size: 1.6rem;
  margin-top: 5rem;
  font-weight: 500;

  @media only screen and (max-width: 992px) {
    font-size: 1.1rem;
    margin: 0 auto;
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

const LogInUrl =
  "https://voicecontrollerbackendapi.herokuapp.com/api/teachers/login";

function LoginForm(props) {
  const { touched, errors } = props;

  return (
    <StyledForm id="login">
      <StyledH1>Welcome!</StyledH1>
      <StyledH2>Everything is fine.</StyledH2>
      <br />
      <StyledH3>Please sign in</StyledH3>
      <br />

      {errors.username && touched.username && <Alert>{errors.username}</Alert>}
      <StyledField name="username" placeholder="Username" />

      {errors.password && touched.password && <Alert>{errors.password}</Alert>}
      <StyledField name="password" placeholder="Password" />

      <StyledSubmitButton
        type="submit"
        name="Sign In!"
        placeholder="Sign In"
        // onClick={login}
      />
    </StyledForm>
  );
}

export default withRouter(
  withFormik({
    mapPropsToValues: ({
      username,
      password,
      setSubmitting,
      setErrors,
      setStatus,
      ...props
    }) => {
      return {
        username: username || "",
        password: password || ""
      };
    },

    handleSubmit(values, { props }) {
      // console.log(props.history);
      axios
        .post(LogInUrl, values)
        .then(response => {
          // return (window.location.href = `/teacher/${response.data.teacher.teacher_id}`);
          props.history.push(`/teacher/${response.data.teacher.teacher_id}`);
        })
        .catch(err => {
          console.log("Login Error: ", err);
          alert("Login Error: {err.message}");
        });
      return;
    },

    validationSchema: Yup.object().shape({
      username: Yup.string().required(" * Your username is required to login"),
      password: Yup.string().required(" * Password is required to login")
    })
  })(LoginForm)
);
