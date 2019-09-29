import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const TimerDisplay = styled.div`
  width: 100%;
  font-size: 2.8rem;
  font-weight: 800;
  color: white;
  filter: drop-shadow(0 0 0.25rem black);
  position: absolute;
  bottom: 0;
  margin-bottom: 15vh;
  z-index: 9;
  text-align: center;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
`;

const VolumeDisplay = styled.div`
  width: 100%;
  font-size: 2.8rem;
  font-weight: 800;
  color: white;
  filter: drop-shadow(0 0 0.25rem black);
  position: absolute;
  bottom: 0;
  margin-bottom: 15vh;
  z-index: 5;
  text-align: left;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
`;

const MeterDisplay = styled.div`
  width: 100%;
  font-size: 2.8rem;
  font-weight: 800;
  color: white;
  filter: drop-shadow(0 0 0.25rem black);
  position: absolute;
  bottom: 0;
  margin-bottom: 15vh;
  z-index: 5;
  text-align: right;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
`;

const ScoreDisplay = styled.div`
  width: 100%;
  font-size: 2.4rem;
  font-weight: 800;
  color: white;
  filter: drop-shadow(0 0 0.25rem black);
  position: absolute;
  bottom: 0;
  margin-bottom: 1vh;
  z-index: 100;
  text-align: center;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
`;

const StyledButton = styled.button`
  user-select: none;
  filter: drop-shadow(0 0 0.15rem black);
  display: block;
  width: 15vw;
  min-width: 150px;
  margin: 2vh auto 0;
  padding: 10px;
  border-radius: 15px;
  &:focus {
    outline: none;
  }
  font-size: ${props => (props.shh ? "15rem" : "1.6rem")};
  z-index: 10000;
  background: ${props =>
    props.shh ? "transparent" : "rgba(255,255,255,0.75)"};
  border: ${props => (props.shh ? "0" : "")};
  transition: all 1s;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Timer({
  visible,
  setVisible,
  micSensitivity,
  animalChangeTime,
  scattered,
  sendEmScattering
}) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [score, setScore] = useState(100);
  const [scoreObject, setScoreObject] = useState({});
  const [volumeReading, setVolumeReading] = useState(0);
  const [meterProgress, setMeterProgress] = useState(0);

  function scoreEmoji() {
    // console.log(score);
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
      startMic();
      axios
        .post(
          "https://voicecontrollerbackendapi.herokuapp.com/api/scores/start",
          {},
          { headers: { Authorization: localStorage.token } }
        )
        .then(response => {
          setScoreObject(response.data);
        })
        .catch();
    } else {
      reset();
      window.localStream.getTracks().forEach(track => track.stop());
      scoreObject.score_value = score;
      axios
        .put(
          "https://voicecontrollerbackendapi.herokuapp.com/api/scores/end",
          scoreObject,
          { headers: { Authorization: localStorage.token } }
        )
        .then(response => {
          setScoreObject({});
          setScore(100);
        });
    }
  }

  function reset() {
    setIsActive(false);
    setSeconds(0);
    setMeterProgress(0);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 1 && !((seconds + 1) % animalChangeTime)) {
          if (visible < 6) setVisible(visible => visible + 1);
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
  }, [isActive, seconds, minutes, animalChangeTime, visible, setVisible]);

  const sensitivity = micSensitivity;
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
          setIsActive(true);
          window.localStream = stream;
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
            setVolumeReading(volume);
            if (volume > 100) {
              microreadings += 1;
              setMeterProgress(microreadings);
              //This is where the hide animal function will go
              if (microreadings > 50) {
                sendEmScattering(true);
                microreadings = 0;
                setScore(score => (score - 10 >= 0 ? score - 10 : 0));
                reset();
                setTimeout(() => {
                  setVisible(0);
                  sendEmScattering(false);
                  setIsActive(true);
                }, 6000);
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
        TIME: {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
        <StyledButton
          onClick={toggle}
          style={{ cursor: "pointer" }}
          shh={scattered}
        >
          {isActive ? "STOP" : !scattered ? "START" : "🤫"}
        </StyledButton>
      </TimerDisplay>
      <VolumeDisplay>
        <div
          style={{
            float: "left",
            height: "410px",
            border: "2px solid black",
            width: "50px",
            marginLeft: "50px",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              height: `${volumeReading * 4 + 10}px`,
              backgroundColor: `${volumeReading > 100 ? "red" : "green"}`
            }}
          ></div>
        </div>
      </VolumeDisplay>

      <MeterDisplay>
        <div
          style={{
            height: "410px",
            border: "2px solid black",
            width: "50px",
            float: "right",
            marginRight: "50px",
            position: "relative"
          }}
        >
          <div
            style={{
              height: `${meterProgress * 8 + 10}px`,
              width: "50px",
              backgroundColor: `${meterProgress > 40 ? "red" : "yellow"}`
            }}
          ></div>
        </div>
      </MeterDisplay>
      <ScoreDisplay>
        SCORE: {score} {scoreEmoji()}
      </ScoreDisplay>
    </div>
  );
}

export default Timer;
