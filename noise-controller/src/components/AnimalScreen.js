import React, { useState, useEffect } from "react";
import styled from "styled-components";

//To see what the animal screen looks like so far, render this component to App.js.
//Just wanted to have something coming on the screen with some basic styled.

const Screen = styled.div`
  position: relative;
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
      visible: true,
      homePosition: ["calc(20% - 7.5vh)", "calc(15% - 7.5vh)"],
      hiddenPosition: ["50%", "-100px"]
    },
    {
      label: "mouse",
      symbol: "🐭",
      visible: true,
      homePosition: ["calc(50% - 7.5vh)", "calc(15% - 7.5vh)"],
      hiddenPosition: ["50%", "-100px"]
    },
    {
      label: "dog",
      symbol: "🐶",
      visible: true,
      homePosition: ["calc(80% - 7.5vh)", "calc(15% - 7.5vh)"],
      hiddenPosition: ["50%", "-100px"]
    },
    {
      label: "pig face",
      symbol: "🐷",
      visible: true,
      homePosition: ["calc(20% - 7.5vh)", "calc(37.5% - 7.5vh)"],
      hiddenPosition: ["50%", "-100px"]
    },
    // {
    //   label: "snail",
    //   symbol: "🐌",
    //   visible: true,
    // homePosition: [0, 0],hiddenPosition: ['50%', '-100px'],, },
    {
      label: "peacock",
      symbol: "🦚",
      visible: true,
      homePosition: ["calc(50% - 7.5vh)", "calc(37.5% - 7.5vh)"],
      hiddenPosition: ["50%", "-100px"]
    },
    {
      label: "lion",
      symbol: "🦁",
      visible: true,
      homePosition: ["calc(80% - 7.5vh)", "calc(37.5% - 7.5vh)"],
      hiddenPosition: ["50%", "-100px"]
    },
    {
      label: "bear",
      symbol: "🐻",
      visible: true,
      homePosition: ["calc(20% - 7.5vh)", "calc(62.5% - 7.5vh)"],
      hiddenPosition: ["50%", "-100px"]
    },
    {
      label: "panda",
      symbol: "🐼",
      visible: true,
      homePosition: ["calc(50% - 7.5vh)", "calc(62.5% - 7.5vh)"],
      hiddenPosition: ["50%", "-100px"]
    },
    {
      label: "cow",
      symbol: "🐮",
      visible: true,
      homePosition: ["calc(80% - 7.5vh)", "calc(62.5% - 7.5vh)"],
      hiddenPosition: ["50%", "-100px"]
    },
    {
      label: "tiger",
      symbol: "🐯",
      visible: true,
      homePosition: ["calc(20% - 7.5vh)", "calc(85% - 7.5vh)"],
      hiddenPosition: ["50%", "-100px"]
    },
    {
      label: "rabbit",
      symbol: "🐰",
      visible: true,
      homePosition: ["calc(50% - 7.5vh)", "calc(85% - 7.5vh)"],
      hiddenPosition: ["50%", "-100px"]
    },
    {
      label: "unicorn",
      symbol: "🦄",
      visible: true,
      homePosition: ["calc(80% - 7.5vh)", "calc(85% - 7.5vh)"],
      hiddenPosition: ["50%", "-100px"]
    }
  ]);

  const Emoji = props => (
    <span
      className="emoji"
      role="img"
      aria-label={props.label ? props.label : ""}
      aria-hidden={props.label ? "false" : "true"}
      style={{
        visibility: props.visible ? "visible" : "hidden",
        position: "absolute",
        left: props.visible ? props.homePosition[0] : props.hiddenPosition[0],
        top: props.visible ? props.homePosition[1] : props.hiddenPosition[1],
        fontSize: "15vh"
      }}
    >
      {" "}
      {props.symbol}
    </span>
  );

  return (
    <Screen>
      {animals.map(animal => (
        <Emoji
          label={animal.label}
          symbol={animal.symbol}
          visible={animal.visible}
          homePosition={animal.homePosition}
        />
      ))}
    </Screen>
  );
}

export default AnimalScreen;
