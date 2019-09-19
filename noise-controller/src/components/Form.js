import React, { useState, useEffect } from 'react';
import Formik, { Form, Field, withFormik } from 'formik';
import axios from 'axios';

function UserForm() {
    const [ user, setUser ] = useState();

    useEffect(() => {
        // Do stuff
    }, [user])

    return ( //Basic form ready to take in a name, email, and password that we will
            // later send to an API in the form fo a POST request.
        <Form>
            <Field name='name' />
            <Field name='email' />
            <Field name='password' />
        </Form>
    )
}

export default withFormik({
    mapPropsToValues: ({ name, email, password }) => {
        return {
            name: name || '',
            email: email || '',
            password: password || ''
        }
    }
})(UserForm);