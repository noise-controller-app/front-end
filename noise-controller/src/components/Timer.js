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
  background-color: ${props => (props.shh ? "red" : "white")};
`;

function Timer({
  isActive,
  setIsActive,
  visible,
  setVisible,
  animal_change_time,
  scattered,
  sendEmScattering
}) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  function toggle() {
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

  const sensitivity = 2;
  //2- You can talk next to it
  //4- You can kind of whisper
  //8- your whispering voice should trigger

  //Microreadings are each instant it is above the volume threshold. 50 of these fill up the bar, the animal runs away, and the score is subtracted.
  let microreadings = 0;
  let score = 0;

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
          setIsActive(true);
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
                score -= 10;
                reset();
                //This is where you would actually decrease the
                //score in the state, not here.
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
    <TimerDisplay>
      Time: {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
      <br />
      <StyledButton onClick={toggle} shh={scattered}>
        {isActive ? "Stop" : !scattered ? "Start" : "Too loud. Shhhh...."}
      </StyledButton>
    </TimerDisplay>
  );
}

export default Timer;
