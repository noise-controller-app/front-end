import React from 'react';
import styled from 'styled-components';

//To see what the animal screen looks like so far, render this component to App.js.
//Just wanted to have something coming on the screen with some basic styled.

const Screen = styled.div `
    height: 80vh;
    width: 60%;
    border: 5px solid green;
    background-color: yellow;
`

function AnimalScreen() {
    return (
        <Screen>
            This is the Animal Screen Component!
        </Screen>
    )
}

export default AnimalScreen;