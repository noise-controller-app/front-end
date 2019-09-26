import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TimerDisplay = styled.div`
  width: 100%;
  font-size: 2.4rem;
  font-weight: 800;
  color: white;
  text-shadow: 1px 1px black;
  position: absolute;
  margin: 1vh 0 0 2vw;
  z-index: 10000;
  text-align: center;
`;

const ScoreDisplay = styled.div`
  width: 100%;
  font-size: 2.4rem;
  font-weight: 800;
  color: white;
  text-shadow: 1px 1px black;
  position: absolute;
  bottom: 0;
  margin: 0 0 1vh 2vw;
  z-index: 10000;
  text-align: center;
`;

const StyledButton = styled.button`
  &:focus {
    outline: none;
    border: none;
  }
  box-shadow: ${props => (props.shh ? "" : "1px 1px black")};
  font-size: ${props => (props.shh ? "18rem" : "1.6rem")};
  z-index: 10000;
  background: ${props =>
    props.shh ? "transparent" : "rgba(255,255,255,0.75)"};
`;

function Timer({
  visible,
  setVisible,
  mic_sensitivity,
  animal_change_time,
  scattered,
  sendEmScattering
}) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [score, setScore] = useState(100);

  function scoreEmoji() {
    console.log(score);
    switch (true) {
      case score > 80:
        return "😃";
      case score > 60:
        return "🙂";
      case score > 40:
        return "😐";
      case score > 20:
        return "🙁";
      case score > 0:
        return "😩";
      default:
        return "😞";
    }
  }

  function toggle() {
    if (!isActive) {
      setSeconds(0);
      setMinutes(0);
    }
    startMic();
  }

  function reset() {
    setVisible(0);
    setIsActive(false);
    setSeconds(0);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
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
  }, [isActive, seconds, minutes, animal_change_time, visible, setVisible]);

  const sensitivity = mic_sensitivity;
  //2- You can talk next to it
  //4- You can kind of whisper
  //8- your whispering voice should trigger

  //Microreadings are each instant it is above the volume threshold. 50 of these fill up the bar, the animal runs away, and the score is subtracted.
  let microreadings = 0;

  // Adapted from www.0AV.com, LGPL license or as set by forked host, Travis Holliday

  function startMic() {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;
    if (navigator.getUserMedia) {
      navigator.getUserMedia(
        {
          audio: true
        },
        function(stream) {
          setIsActive(isActive => !isActive);
          let audioContext = new AudioContext();
          let analyser = audioContext.createAnalyser();
          let microphone = audioContext.createMediaStreamSource(stream);
          let javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

          analyser.smoothingTimeConstant = 0.8;
          analyser.fftSize = 2048;

          microphone.connect(analyser);
          analyser.connect(javascriptNode);
          javascriptNode.connect(audioContext.destination);

          javascriptNode.onaudioprocess = function() {
            let array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            let values = 0;

            let length = array.length;
            for (var i = 0; i < length; i++) {
              values += array[i];
            }

            let volume = (values / length) * sensitivity;

            if (volume > 100) {
              console.log(volume);
              microreadings += 1;
              //This is where the hide animal function will go
              if (microreadings > 50) {
                // console.log("Scattered!");
                sendEmScattering(true);
                microreadings = 0;
                setScore(score => (score - 10 ? score - 10 : 0));
                reset();
                setTimeout(() => {
                  setIsActive(true);
                  sendEmScattering(false);
                }, (seconds % animal_change_time) * 1000 + 6000);
              } else {
                // sendEmScattering(false);
              }
            } else {
              //This is where the show animal function will go
            }
          }; // end fn stream
        },
        function(err) {
          alert("The following error occured: " + err.name);
        }
      );
    } else {
      alert("getUserMedia not supported");
    }
  }

  return (
    <div>
      <TimerDisplay>
        Time: {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
        <br />
        <StyledButton onClick={toggle} shh={scattered}>
          {isActive ? "Stop" : !scattered ? "Start" : "🤫"}
        </StyledButton>
      </TimerDisplay>
      <ScoreDisplay>
        Score: {score} {scoreEmoji()}
      </ScoreDisplay>
    </div>
  );
}

export default Timer;
