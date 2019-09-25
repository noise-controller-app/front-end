import React from 'react';
import styled from 'styled-components';

//To see what the animal screen looks like so far, render this component to App.js.
//Just wanted to have something coming on the screen with some basic styled.

const Screen = styled.div `
    height: 80vh;
    width: 60%;
    border: 5px solid green;
    background-color: OldLace;
`

function AnimalScreen() {
    const Emoji = props => (
        <span className="emoji"
            role="img"  
            aria-label={props.label ? props.label : ""}
            aria-hidden={props.label ? "false" : "true"} 
            > {props.symbol} 
        </span>
    );

    return (
        <Screen>
            This is the Animal Screen Component!
            <Emoji label="sheep" symbol="🐑"/>
            <Emoji label="mouse" symbol="🐭"/>
            <Emoji label="dog" symbol="🐶"/>
            <Emoji label="pig face" symbol="🐷"/>
            <Emoji label="snail" symbol="🐌"/>
            <Emoji label="peacock" symbol="🦚" />
            <Emoji label="lion" symbol="🦁"/>
            <Emoji label="bear" symbol="🐻"/>
            <Emoji label="panda" symbol="🐼"/>
            <Emoji label="cow" symbol="🐮"/>
            <Emoji label="tiger" symbol="🐯"/>
            <Emoji label="rabbit" symbol="🐰"/>
            <Emoji label="unicorn" symbol="🦄"/>
        </Screen>
    )
}

export default AnimalScreen;