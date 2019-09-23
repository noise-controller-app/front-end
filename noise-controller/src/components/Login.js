import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import styled from 'styled-components';

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

const StyledH1 = styled('h1')`
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

const StyledH2 = styled('h2')`
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

const StyledH3 = styled('h3')`
    font-size: 1.6rem;
    margin-top: 5rem;
    font-weight: 500;

    @media only screen and (max-width: 992px) {
        font-size: 1.1rem;
        margin: 0 auto;
    }
`;

const Alert = styled('p')`
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

function LoginForm({status, touched, errors}){
    const [ returnUser, setReturnUser ] = useState([]);

    // useEffect(() => {
    //     if (status) {
    //         setReturnUser([...returnUser, status])
    //     }
    // }, [status])

  return(
        <StyledForm id='login'>
            <StyledH1>Welcome!</StyledH1>
            <StyledH2>Everything is fine.</StyledH2>
            <br />
            <StyledH3>Please sign in</StyledH3>
            <br />
            
            {errors.email && touched.email && <Alert>{errors.email}</Alert>}
            <StyledField name='email' 
                    placeholder='Email' 
                />
            
            {errors.password && touched.password && <Alert>{errors.password}</Alert>}
            <StyledField name='password'  
                    placeholder='Password' 
                />
            
            <StyledSubmitButton type='submit' 
                    name='Sign In!' 
                    placeholder="Sign In" 
                />
        </StyledForm>
  )}


  export default withFormik({
      mapPropsToValues: ({ email, password }) => {
          return {
            email: email || "",
            password: password || ""
          };
      },

      // add axios request link for Jordan's API with handleSubmit
        
      validationSchema: Yup.object().shape({
          email: Yup.string()
          .required(' * Your email is required to login'),
          password: Yup.string()
          .required(' * Password is required to login')
        })
    })(LoginForm);