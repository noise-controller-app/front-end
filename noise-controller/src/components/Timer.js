import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TimerDisplay = styled.div`
  font-size: 2.4rem;
  font-weight: 800;
  color: white;
  text-shadow: 1px 1px black;
  position: absolute;
  margin: 1vh 0 0 2vw;
  z-index: 10000;
`;

const StyledButton = styled.button`
  box-shadow: 1px 1px black;
  font-size: 1.6rem;
  position: absolute;
  z-index: 10000;
`;

function Timer({
  isActive,
  setIsActive,
  visible,
  setVisible,
  animal_change_time
}) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        console.log(animal_change_time);
        if (seconds > 1 && !((seconds + 1) % animal_change_time)) {
          if (visible < 12) setVisible(visible => visible + 1);
        }

        if (seconds >= 59) {
          setMinutes(minutes => minutes + 1);
          setSeconds(0);
        } else {
          setSeconds(seconds => seconds + 1);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);
  return (
    <TimerDisplay>
      Time: {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
      <br />
      <StyledButton onClick={toggle}>
        {isActive ? "Stop" : "Start"}
      </StyledButton>
    </TimerDisplay>
  );
}

export default Timer;
