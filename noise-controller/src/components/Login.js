import React, { useState, useEffect } from 'react';
import Formik, { Form, Field, withFormik } from 'formik';
import axios from 'axios';
import styled from "styled-components";


function LoginForm(){
    const [ returnUser, setReturnUser ] = useState();

    useEffect(() => {
        // Do some stuff and thangs
    }, [returnUser])

  return(
      <div>
        <h2>Making Classrooms Quiet Again!</h2>
        <Form id="login">
            <Field type="email" autoComplete="username" placeholder="Email" />
            <Field type="password" autoComplete="current-password" placeholder="Password" />
            <Field type="submit" value="Sign In!" />
        </Form>
      </div>
  )

}


export default LoginForm;