import React, { useState, useEffect } from "react";
import AnimalScreen from "./AnimalScreen";
import TeacherSlide from './TeacherSlide'
import styled from "styled-components";
import axios from "axios";

const Page = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
`;



const AnimalScreenWrapper = styled.div`
  position: relative;
  flex: 1;
  background-color: OldLace;
  background: url(/assets/forest.png) no-repeat center bottom fixed;
  background-size: cover;
`;

function TeacherPage(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const headers = { headers: {'Authorization': localStorage.token} }
      const res = await axios.get(
        `https://voicecontrollerbackendapi.herokuapp.com/api/teachers/${props.match.params.id}`, headers
      );
      setUser({...res.data.teacher, scores: res.data.scores});
    }
    fetchData();
  }, [props.match.params.id]);

  return (
    <Page className="teacher-page-wrapper">
      {user ? (
        <TeacherSlide user={user} />
      ) : (
        <h1>Loading...</h1>
      )}

      {/* This will render the screen that shows animals bouncing around */}
      <AnimalScreenWrapper>
        <AnimalScreen
          mic_sensitivity={user ? user.mic_sensitivity : null}
          animal_change_time={user ? user.animal_change_time : null}
        />
      </AnimalScreenWrapper>
    </Page>
  );
}

export default TeacherPage;
