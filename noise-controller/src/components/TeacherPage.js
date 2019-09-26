import React, { useState, useEffect } from "react";
import AnimalScreen from "./AnimalScreen";
import styled from "styled-components";
import axios from "axios";

const Page = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 5vh;
`;

const TeacherInfo = styled.div`
  width: 25%;
  height: 80vh;
  border: 5px solid blue;
`;

const AnimalScreenWrapper = styled.div`
  position: relative;
  height: 80vh;
  width: 100%;
  border: 5px solid green;
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
          Teacher Info:
          <h3>Alias: {user.teacher_name}</h3>
          {/* // This will add a button to the user profile for each classroom they have that will change to a different classroom.
                {/* {props.classrooms.map((classroom) => {
                    <button onClick={}>{classroom.name}</button>
                })} */}
        </TeacherInfo>
      ) : (
        <h1>Loading...</h1>
      )}

      {/* This will render the screen that shows animals bouncing around or what ever we decide once we are able to make it work. */}
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
