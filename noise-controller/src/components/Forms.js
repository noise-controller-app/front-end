import React from 'react';
import styled from 'styled-components';
import RegisterForm from './RegisterForm';
import LoginForm from './Login';

const Page = styled.div `
    display: flex;
`

function Forms() {
    return (
        <Page>
            <RegisterForm />
            <LoginForm />
        </Page>
    )
}

export default Forms;