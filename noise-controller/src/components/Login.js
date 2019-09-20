import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, withFormik } from 'formik';
import axios from 'axios';


function LoginForm(){
    const [ returnUser, setReturnUser ] = useState([]);

    useEffect(() => {
        // Do stuff and thangs
    }, [returnUser])

  return(
        <Formik>
            <Form id='login'>
                <Field type='text' autoComplete='name' placeholder='name' />
                <Field type='email' autoComplete='username' placeholder='Email' />
                <Field type='password' autoComplete='current-password' placeholder='Password' />
                <Field type='submit' value='Sign In!' />
            </Form>
        </Formik>
  )}


  export default LoginForm;