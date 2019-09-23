import React from 'react';
import AnimalScreen from './AnimalScreen';
import styled from 'styled-components';

const Page = styled.section `
    display: flex;
    justify-content: center;
    margin-top: 5vh;
`

const TeacherInfo = styled.div `
    width: 25%;
    height: 80vh;
    border: 5px solid blue;
`

function TeacherPage(props) {
    return (
        // Waitin for endpoint, added skeleton of what needs to be rendered. Once endpoint
        // is given we can add the actual data paths.

        <Page className='teacher-page-wrapper'>
            <TeacherInfo>
                Teacher Info:
                {/* <h1>{teacher.name}</h1>
                <img src='{teacher.imageURL}' /> */}
                {/* // This will add a button to the user profile for each classroom they have that will change to a different classroom. */}
                {/* {props.classrooms.map((classroom) => {
                    <button onClick={}>{classroom.name}</button>
                })} */}
            </TeacherInfo>

            {/* This will render the screen that shows animals bouncing around or what ever we decide once we are able to make it work. */}
            <AnimalScreen />
        </Page>
    )
}

export default TeacherPage;