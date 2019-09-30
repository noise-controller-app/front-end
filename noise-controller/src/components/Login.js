import React from "react";
import { Form, Field, withFormik } from "formik";
import { withRouter } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import styled from "styled-components";

const StyledForm = styled(Form)`
  color: blue;
  background-color: rgba(255, 255, 255, 0.8);
  width: 45%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 5em auto;
  border: 1rem solid #fe9a4d;
  min-height: 45vh;
  padding: 10px;

  @media only screen and (max-width: 992px) {
    padding: 1em;
  }
`;

const StyledH2 = styled("h2")`
  font-size: 3rem;
  font-weight: 500;
  color: rgb(71,103,142);

  @media only screen and (max-width: 992px) {
    font-size: 1.6rem;
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
  height: 2rem;
  width: 60%;
  border: 2px solid #fe9a4d;
  margin: 1rem auto;
  padding: 5px;
  font-size: 1rem;
  border-radius: 10px;
`;

const StyledSubmitButton = styled(Field)`
  height: 2rem;
  font-size: 1rem;
  width: 30%;
  border: 2px solid #8c8c8c;
  color: white;
  background-color: #fe9a4d;
  margin: 0.5rem auto;

  @media only screen and (max-width: 992px) {
    width: 60%;
  }
`;

const StyledImg = styled('img')`

  @media only screen and (max-width: 992px) {
    width: 38vw;
    height: 38vh;
  }
`;

const LogInUrl =
  "https://voicecontrollerbackendapi.herokuapp.com/api/teachers/login";

function LoginForm(props) {
  const { touched, errors } = props;

  return (
    <StyledForm id="login">
      <StyledImg
        src="https://www.freelogodesign.org/file/app/client/thumb/c306569e-6f69-46fc-b170-b46ad0cde7cd_200x200.png?1569527074537"
        height="300px"
        data-pin-nopin="true"
        alt="Quiet Time logo"
      />

      <StyledH2>Already have a profile?<br /> Please sign in</StyledH2>
      <br />

      {errors.username && touched.username && <Alert>{errors.username}</Alert>}
      <StyledField name="username" placeholder="Username" />

      {errors.password && touched.password && <Alert>{errors.password}</Alert>}
      <StyledField type="password" name="password" placeholder="Password" />

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
          localStorage.setItem("token", response.data.token);
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
