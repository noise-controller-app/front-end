import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import Timer from "./Timer";

const Screen = styled.div`
  position: relative;
  height: 80vh;
  width: 100%;
`;

const fadeIn = homePosition => keyframes`
  0%   {
    opacity: 0;
    font-size: 24rem;
    top: calc(50% - 12rem);
    left: calc(50% - 12rem);
  }
  50% {
    opacity: 1;
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

const scatter = homePosition => keyframes`
  0%   {
    opacity: 1;
    font-size: 15vh;
    left: ${homePosition[0]};
    top: ${homePosition[1]};
  }
  100% {
    opacity: 0;
    font-size: 15vh;
    left: calc(50% - 15vh);
    top: -100px;
  }
`;

const animateExisting = props =>
  css`
    ${bounce} ${2 +
      Math.random(0.3)}s cubic-bezier(0.28, 0.84, 0.42, 1) 0s infinite;
  `;

const animateNew = props =>
  css`
    ${props => fadeIn(props.homePosition)} 2s ease,
    ${bounce} 2s cubic-bezier(0.28, 0.84, 0.42, 1) 2s infinite;
  `;

const StyledEmoji = styled.span`
  user-select: none;
  position: absolute;
  font-size: 15vh;
  left: ${props => props.homePosition[0]};
  top: ${props => props.homePosition[1]};
  animation: ${props =>
    props.status === "scatter"
      ? scatter
      : props.status === "new"
      ? animateNew
      : animateExisting};
  animation-fill-mode: forwards;
`;

function AnimalScreen({ mic_sensitivity, animal_change_time }) {
  const [isActive, setIsActive] = useState(false);
  const [visible, setVisible] = useState(0);
  const [scattering, sendEmScattering] = useState(false);

  const [animals, updateAnimals] = useState([
    {
      label: "sheep",
      symbol: "🐑",
      homePosition: ["calc(20% - 7.5vh)", "calc(15% - 7.5vh)"]
    },
    {
      label: "mouse",
      symbol: "🐭",
      homePosition: ["calc(50% - 7.5vh)", "calc(15% - 7.5vh)"]
    },
    {
      label: "dog",
      symbol: "🐶",
      homePosition: ["calc(80% - 7.5vh)", "calc(15% - 7.5vh)"]
    },
    {
      label: "pig face",
      symbol: "🐷",
      homePosition: ["calc(20% - 7.5vh)", "calc(37.5% - 7.5vh)"]
    },
    {
      label: "duck",
      symbol: "🦆",
      homePosition: ["calc(50% - 7.5vh)", "calc(37.5% - 7.5vh)"]
    },
    {
      label: "lion",
      symbol: "🦁",
      homePosition: ["calc(80% - 7.5vh)", "calc(37.5% - 7.5vh)"]
    },
    {
      label: "bear",
      symbol: "🐻",
      homePosition: ["calc(20% - 7.5vh)", "calc(62.5% - 7.5vh)"]
    },
    {
      label: "panda",
      symbol: "🐼",
      homePosition: ["calc(50% - 7.5vh)", "calc(62.5% - 7.5vh)"]
    },
    {
      label: "cow",
      symbol: "🐮",
      homePosition: ["calc(80% - 7.5vh)", "calc(62.5% - 7.5vh)"]
    },
    {
      label: "tiger",
      symbol: "🐯",
      homePosition: ["calc(20% - 7.5vh)", "calc(85% - 7.5vh)"]
    },
    {
      label: "rabbit",
      symbol: "🐰",
      homePosition: ["calc(50% - 7.5vh)", "calc(85% - 7.5vh)"]
    },
    {
      label: "unicorn",
      symbol: "🦄",
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
      status={props.status}
    >
      {props.symbol}
    </StyledEmoji>
  );

  const Animals = React.memo(props => {
    if (visible > 1) {
      const last = visible > animals.length ? animals.length - 1 : visible - 1;
      return animals
        .slice(0, visible - 1)
        .map(animal => (
          <Emoji
            key={animal.symbol}
            label={animal.label}
            symbol={animal.symbol}
            homePosition={animal.homePosition}
            status={scattering ? "scatter" : "old"}
          />
        ))
        .concat(
          <Emoji
            key={animals[last].symbol}
            label={animals[last].label}
            symbol={animals[last].symbol}
            homePosition={animals[last].homePosition}
            status={scattering ? "scatter" : "new"}
          />
        );
    } else {
      return visible === 1 ? (
        <Emoji
          key={animals[0].symbol}
          label={animals[0].label}
          symbol={animals[0].symbol}
          homePosition={animals[0].homePosition}
          status={scattering ? "scatter" : "new"}
        />
      ) : (
        animals
          .slice(0, visible)
          .map(animal => (
            <Emoji
              key={animal.symbol}
              label={animal.label}
              symbol={animal.symbol}
              homePosition={animal.homePosition}
              status="scatter"
            />
          ))
      );
    }
  });

  console.log("Scatter", scattering);
  return (
    <div>
      <Screen>
        <Animals />
        {/* <Timer minutes={minutes} seconds={seconds} toggleButton={toggle} /> */}
        <Timer
          isActive={isActive}
          setIsActive={setIsActive}
          visible={visible}
          setVisible={setVisible}
          animal_change_time={animal_change_time}
          scattered={scattering}
          sendEmScattering={sendEmScattering}
        />
      </Screen>
    </div>
  );
}

export default AnimalScreen;
