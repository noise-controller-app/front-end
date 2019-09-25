import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

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

const fadeIn = keyframes`
  0%   {
    opacity: 0;
    font-size: 24rem;
    top: calc(50% - 12rem);
    left: calc(50% - 12rem);
  }
  100% {
    opacity: 1;
    font-size: 24rem;
    top: calc(50% - 12rem);
    left: calc(50% - 12rem);
  }
`;

const slideHome = homePosition => keyframes`
  0%   {
    font-size: 24rem;
    top: calc(50% - 12rem);
    left: calc(50% - 12rem);
  }
  100% {
    font-size: 15vh;
    left: ${homePosition[0]};
    top: ${homePosition[1]};
  }
`;

const bounce = keyframes`
  0%   { transform: scale(1,1)      translateY(0); }
  10%  { transform: scale(1.1,.9)   translateY(0); }
  30%  { transform: scale(.9,1.1)   translateY(-50px); }
  50%  { transform: scale(1.05,.95) translateY(0); }
  57%  { transform: scale(1,1)      translateY(-7px); }
  64%  { transform: scale(1,1)      translateY(0); }
  100% { transform: scale(1,1)      translateY(0); }
`;

const StyledEmoji = styled.span`
  position: absolute;
  animation: ${fadeIn} 2s linear, ${props =>
  slideHome(
    props.homePosition
  )} 1s ease 2s, ${bounce} 2s cubic-bezier(0.280, 0.840, 0.420, 1) 2s infinite;
  animation-fill-mode: forwards;
  // left: ${props => props.homePosition[0]};
  // top: ${props => props.homePosition[1]};
  // font-size: 15vh;
`;

function AnimalScreen() {
  const [animals, updateAnimals] = useState([
    {
      label: "sheep",
      symbol: "🐑",
      visible: true,
      homePosition: ["calc(20% - 7.5vh)", "calc(15% - 7.5vh)"]
    },
    {
      label: "mouse",
      symbol: "🐭",
      visible: true,
      homePosition: ["calc(50% - 7.5vh)", "calc(15% - 7.5vh)"]
    },
    {
      label: "dog",
      symbol: "🐶",
      visible: true,
      homePosition: ["calc(80% - 7.5vh)", "calc(15% - 7.5vh)"]
    },
    {
      label: "pig face",
      symbol: "🐷",
      visible: true,
      homePosition: ["calc(20% - 7.5vh)", "calc(37.5% - 7.5vh)"]
    },
    // {
    //   label: "snail",
    //   symbol: "🐌",
    //   visible: true,
    // homePosition: [0, 0]
    {
      label: "duck",
      symbol: "🦆",
      visible: true,
      homePosition: ["calc(50% - 7.5vh)", "calc(37.5% - 7.5vh)"]
    },
    {
      label: "lion",
      symbol: "🦁",
      visible: true,
      homePosition: ["calc(80% - 7.5vh)", "calc(37.5% - 7.5vh)"]
    },
    {
      label: "bear",
      symbol: "🐻",
      visible: true,
      homePosition: ["calc(20% - 7.5vh)", "calc(62.5% - 7.5vh)"]
    },
    {
      label: "panda",
      symbol: "🐼",
      visible: true,
      homePosition: ["calc(50% - 7.5vh)", "calc(62.5% - 7.5vh)"]
    },
    {
      label: "cow",
      symbol: "🐮",
      visible: true,
      homePosition: ["calc(80% - 7.5vh)", "calc(62.5% - 7.5vh)"]
    },
    {
      label: "tiger",
      symbol: "🐯",
      visible: true,
      homePosition: ["calc(20% - 7.5vh)", "calc(85% - 7.5vh)"]
    },
    {
      label: "rabbit",
      symbol: "🐰",
      visible: true,
      homePosition: ["calc(50% - 7.5vh)", "calc(85% - 7.5vh)"]
    },
    {
      label: "unicorn",
      symbol: "🦄",
      visible: true,
      homePosition: ["calc(80% - 7.5vh)", "calc(85% - 7.5vh)"]
    }
  ]);

  const Emoji = props => (
    <StyledEmoji
      className="emoji"
      role="img"
      aria-label={props.label ? props.label : ""}
      aria-hidden={props.label ? "false" : "true"}
      homePosition={props.homePosition}
    >
      {props.symbol}
    </StyledEmoji>
  );

  return (
    <Screen>
      {animals
        .filter(animal => animal.visible)
        .map(animal => (
          <Emoji
            label={animal.label}
            symbol={animal.symbol}
            homePosition={animal.homePosition}
          />
        ))}
    </Screen>
  );
}

export default AnimalScreen;
