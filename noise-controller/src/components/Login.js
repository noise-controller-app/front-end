import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, withFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import styled from 'styled-components';


function LoginForm(){
    const [ returnUser, setReturnUser ] = useState([]);

    useEffect(() => {
        // Do stuff and thangs
    }, [returnUser])

  return(
        <div>
            <Form id='login'>
                <Field type='text' autoComplete='name' placeholder='name' />
                <Field type='email' autoComplete='username' placeholder='Email' />
                <Field type='password' autoComplete='current-password' placeholder='Password' />
                <Field type='submit' value='Sign In!' />
            </Form>
        </div>
  )}


  export default LoginForm;