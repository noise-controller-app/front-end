import React from 'react'

import styled from "styled-components";


const TeacherInfo = styled.div`
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.75);
  background-color: rgba(0, 0, 0, 0.7);
  background: linear-gradient(45deg, rgba(26, 14, 114, 0.5) 0%, rgba(26, 14, 114, 0.5) 16.667%,rgba(21, 47, 104, 0.5) 16.667%, rgba(21, 47, 104, 0.5) 33.334%,rgba(16, 80, 93, 0.5) 33.334%, rgba(16, 80, 93, 0.5) 50.001%,rgba(10, 112, 83, 0.5) 50.001%, rgba(10, 112, 83, 0.5) 66.668%,rgba(5, 145, 72, 0.5) 66.668%, rgba(5, 145, 72, 0.5) 83.335%,rgba(0, 178, 62, 0.5) 83.335%, rgba(0, 178, 62, 0.5) 100.002%),linear-gradient(135deg, rgb(7, 214, 89) 0%, rgb(7, 214, 89) 16.667%,rgb(20, 192, 100) 16.667%, rgb(20, 192, 100) 33.334%,rgb(33, 170, 110) 33.334%, rgb(33, 170, 110) 50.001%,rgb(45, 147, 121) 50.001%, rgb(45, 147, 121) 66.668%,rgb(58, 125, 131) 66.668%, rgb(58, 125, 131) 83.335%,rgb(71, 103, 142) 83.335%, rgb(71, 103, 142) 100.002%);

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

  z-index:10;
`;

class TeacherSlide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSlide: false,
            user: props.user
        }
    }

    toggleSlide = (e) => {
      this.setState({showSlide: !this.state.showSlide})
    }

    render(){
      const user = this.state.user
      return user ? <TeacherInfo>

          {this.state.showSlide ? <div>
          <h3>This Weeks Scores:</h3>
          {
            user.scores.reverse().splice(0, 5).map(score =>
              <p>{score.score_value}</p>
             )
          }


          <img src="https://www.freelogodesign.org/file/app/client/thumb/c306569e-6f69-46fc-b170-b46ad0cde7cd_200x200.png?1569527074537" /><br />
          </div> : "" }
          <h1>{user.teacher_name}{"'s"} Class</h1>

          <span onClick={this.toggleSlide} > { this.state.showSlide ? "Hide ^" : "Show" } </span>
        </TeacherInfo> : ""
    }


}


export default TeacherSlide
