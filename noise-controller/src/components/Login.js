import React, { useState, useEffect } from 'react';
import Formik, { Form, Field, withFormik, } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import styled from 'styled-components';


const StyledForm = styled('Form')`
    color: green;
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 5em auto;
    border: 4rem solid green;
    min-height: 45vh;

    @media (max-width: 600px) {
        padding: 1em;
    }

`;

const StyledH1 = styled('h1')`
    font-size: 4rem;
    font-weight: 900;
    margin: 0 0.5rem;
    display: flex;
    justify-content: center;

    @media (max-width: 600px) {
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

    @media (max-width: 600px) {
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

    @media (max-width: 600px) {
        font-size: 1.1rem;
        margin: 0 auto;
    }
`;


function LoginForm({status, touched, errors}){
    const [ returnUser, setReturnUser ] = useState([]);

    useEffect(() => {
        if (status) {
            setReturnUser([...returnUser, status])
        }
    }, [status])

  return(
        <StyledForm id='login'>
            <StyledH1>Welcome Back!</StyledH1>
            <StyledH2>Everything is fine.</StyledH2>
            <br />
            <StyledH3>Please sign in</StyledH3>
            <div>
                {errors.email && touched.email && <h3>{errors.email}</h3>}
                <Field type='email' 
                    autoComplete='username' 
                    placeholder='Email' 
                />
            </div>
            <div>
                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field type='password' 
                       autoComplete='current-password' 
                       placeholder='Password' 
                />
            </div>
            
            <Field type='submit' value='Sign In!' />
        </StyledForm>
  )}


  export default withFormik({
      mapPropsToValues: ({ email, password}) => {
          return {
            email: email || "",
            password: password || ""
          }
      },

      // add axios request link for Jordan's API with handleSubmit
        
      validationSchema: Yup.object().shape({
          email: Yup.string()
          .required('Your email is required to login'),
          password: Yup.string()
          .required('Password is required to login')
        })
    })(LoginForm);