import React from 'react';
import styled from 'styled-components';
import RegisterForm from './RegisterForm';
import LoginForm from './Login';

const Page = styled.div `
    display: flex;
    flex-wrap:wrap;
    background: linear-gradient(45deg, rgba(26, 14, 114, 0.5) 0%, rgba(26, 14, 114, 0.5) 16.667%,rgba(21, 47, 104, 0.5) 16.667%, rgba(21, 47, 104, 0.5) 33.334%,rgba(16, 80, 93, 0.5) 33.334%, rgba(16, 80, 93, 0.5) 50.001%,rgba(10, 112, 83, 0.5) 50.001%, rgba(10, 112, 83, 0.5) 66.668%,rgba(5, 145, 72, 0.5) 66.668%, rgba(5, 145, 72, 0.5) 83.335%,rgba(0, 178, 62, 0.5) 83.335%, rgba(0, 178, 62, 0.5) 100.002%),linear-gradient(135deg, rgb(7, 214, 89) 0%, rgb(7, 214, 89) 16.667%,rgb(20, 192, 100) 16.667%, rgb(20, 192, 100) 33.334%,rgb(33, 170, 110) 33.334%, rgb(33, 170, 110) 50.001%,rgb(45, 147, 121) 50.001%, rgb(45, 147, 121) 66.668%,rgb(58, 125, 131) 66.668%, rgb(58, 125, 131) 83.335%,rgb(71, 103, 142) 83.335%, rgb(71, 103, 142) 100.002%);
    min-height:100vh
`

function Forms() {
    return (
        <Page>
            <RegisterForm />
            <br />
            <LoginForm />
        </Page>
    )
}

export default Forms;
