import React, { useState, useEffect } from "react";
import AnimalScreen from "./AnimalScreen";
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

const TeacherInfo = styled.div`
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.75);
  background-color: rgba(0, 0, 0, 0.7);
  height: 85px;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  font-family: "Lilita One", cursive;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.5vw;
  color: #66cdaa;
  text-shadow: 1px 1px black;
  text-align: center;
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
      const res = await axios.get(
        `https://voicecontrollerbackendapi.herokuapp.com/api/teachers/${props.match.params.id}`
      );
      setUser(res.data.teacher);
    }
    fetchData();
  }, [props.match.params.id]);

  return (
    <Page className="teacher-page-wrapper">
      {user ? (
        <TeacherInfo>
          <h3>{user.teacher_name}'s Class</h3>
          {/* // This will add a button to the user profile for each classroom they have that will change to a different classroom.
                {/* {props.classrooms.map((classroom) => {
                    <button onClick={}>{classroom.name}</button>
                })} */}
        </TeacherInfo>
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
