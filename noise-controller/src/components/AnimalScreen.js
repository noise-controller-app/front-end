import React, { useState, useEffect } from "react";
import styled from "styled-components";

//To see what the animal screen looks like so far, render this component to App.js.
//Just wanted to have something coming on the screen with some basic styled.

const Screen = styled.div`
  height: 80vh;
  width: 60%;
  border: 5px solid green;
  background-color: OldLace;
  background: url(/assets/forest.png) no-repeat center bottom fixed;
  background-size: cover;
`;

function AnimalScreen() {
  const [animals, updateAnimals] = useState([
    {
      label: "sheep",
      symbol: "🐑",
      visible: true
    },
    {
      label: "mouse",
      symbol: "🐭",
      visible: true
    },
    {
      label: "dog",
      symbol: "🐶",
      visible: true
    },
    {
      label: "pig face",
      symbol: "🐷",
      visible: true
    },
    {
      label: "snail",
      symbol: "🐌",
      visible: true
    },
    {
      label: "peacock",
      symbol: "🦚",
      visible: true
    },
    {
      label: "lion",
      symbol: "🦁",
      visible: true
    },
    {
      label: "bear",
      symbol: "🐻",
      visible: true
    },
    {
      label: "panda",
      symbol: "🐼",
      visible: true
    },
    {
      label: "cow",
      symbol: "🐮",
      visible: true
    },
    {
      label: "tiger",
      symbol: "🐯",
      visible: true
    },
    {
      label: "rabbit",
      symbol: "🐰",
      visible: true
    },
    {
      label: "unicorn",
      symbol: "🦄",
      visible: true
    }
  ]);

  const Emoji = props => (
    <span
      className="emoji"
      role="img"
      aria-label={props.label ? props.label : ""}
      aria-hidden={props.label ? "false" : "true"}
    >
      {" "}
      {props.symbol}
    </span>
  );

  return (
    <Screen>
      This is the Animal Screen Component!
      {animals.map(animal => (
        <Emoji
          label={animal.label}
          symbol={animal.symbol}
          visible={animal.visible}
        />
      ))}
    </Screen>
  );
}

export default AnimalScreen;
