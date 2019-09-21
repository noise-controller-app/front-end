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
    margin: 4em auto;
    border: 4em solid green;
    min-height: 500px;
`;

const StyledH1 = styled('h1')`
    font-size: 4.8em;
`;

const StyledP = styled('p')`
    font-size: 1.6em;
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
            <StyledP>Please sign in</StyledP>
            <div>
                {errors.email && touched.email && <p>{errors.email}</p>}
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

      // add axios request for Jordan's API with handleSubmit
        
      validationSchema: Yup.object().shape({
          email: Yup.string()
          .required('Your email is required to login'),
          password: Yup.string()
          .required('Password is required to login')
        })
    })(LoginForm);