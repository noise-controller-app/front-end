import React from 'react'
import axios from 'axios'
import styled from "styled-components";
import TeacherForm from './TeacherForm';


const TeacherInfo = styled.div`
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.75);
  background-color: rgba(0, 0, 0, 0.7);
  background: linear-gradient(45deg, rgba(26, 14, 114, 0.5) 0%, rgba(26, 14, 114, 0.5) 16.667%,rgba(21, 47, 104, 0.5) 16.667%, rgba(21, 47, 104, 0.5) 33.334%,rgba(16, 80, 93, 0.5) 33.334%, rgba(16, 80, 93, 0.5) 50.001%,rgba(10, 112, 83, 0.5) 50.001%, rgba(10, 112, 83, 0.5) 66.668%,rgba(5, 145, 72, 0.5) 66.668%, rgba(5, 145, 72, 0.5) 83.335%,rgba(0, 178, 62, 0.5) 83.335%, rgba(0, 178, 62, 0.5) 100.002%),linear-gradient(135deg, rgb(7, 214, 89) 0%, rgb(7, 214, 89) 16.667%,rgb(20, 192, 100) 16.667%, rgb(20, 192, 100) 33.334%,rgb(33, 170, 110) 33.334%, rgb(33, 170, 110) 50.001%,rgb(45, 147, 121) 50.001%, rgb(45, 147, 121) 66.668%,rgb(58, 125, 131) 66.668%, rgb(58, 125, 131) 83.335%,rgb(71, 103, 142) 83.335%, rgb(71, 103, 142) 100.002%);

  width: 100%;
  position: fixed;
  top: 0;
  padding:30px;
  display: flex;
  justify-content: center;
  align-items: top;
  font-size: 1.8rem;
  font-family: "Lilita One", cursive;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.5vw;
  color: #66cdaa;
  text-shadow: 1px 1px black;
  text-align: center;

  z-index:1000;
`;

class TeacherSlide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSlide: false,
            user: props.user
        }
    }

    reset = async () => {
      const updated = await this.props.refresh()
      this.setState({showSlide: !this.state.showSlide, user: updated})

    }

    toggleSlide = async (e) => {
      await this.reset();
    }

    averageScore = () => {
      const user = this.state.user
      let totalScore = 0
      const amountScores = user.scores.length
      user.scores.map(score => totalScore += score.score_value)
      return totalScore / amountScores
    }

    currentStreak = () => {
      const user = this.state.user
      const scores = user.scores
      let counter = 0
      let streak = true
      scores.forEach(item => {
        if(streak){
          if(item.score_value === 100){
            counter += 1
          }else {
            streak = false
          }
        }
      })
      return counter
    }

    handleDelete = async (e) => {
      if(window.confirm("Are you sure you wish to permanently delete this score?")){
        const headers = { headers: {'Authorization': localStorage.token} }
        const res = await axios.delete(`https://voicecontrollerbackendapi.herokuapp.com/api/scores/${e.target.attributes.score.value}`, headers)
        console.log(res)
      }
    }

    resetYear = async (e) => {
      if (window.confirm("*WARNING* Are you sure you wish to permanently delete ALL of your scores?")){
        const headers = { headers: {'Authorization': localStorage.token} }
        const res = await axios.delete(`https://voicecontrollerbackendapi.herokuapp.com/api/scores/reset`, headers)
        console.log(res)
      }
    }

    render(){
      const user = this.state.user
      const scores = user.scores.reverse()
      return user ? <TeacherInfo>

          {this.state.showSlide ? <div style={{padding:"20px"}}>
          <h3><span style={{textDecoration:"underline"}}>Past Scores:</span></h3>
          {
            [...scores].splice(0,5).map(score =>
              <p>-{score.score_value} <span onClick={this.handleDelete} score={score.score_id}>(x)</span></p>
             )
          }
          <span style={{textDecoration:"underline"}}>Times Played</span><br /> {user.scores.length}<br />
          <span style={{textDecoration:"underline"}}>Streak</span><br />  {this.currentStreak()}<br />
          <span style={{textDecoration:"underline"}}>Average</span><br /> {this.averageScore() ? Math.ceil(this.averageScore()) : "0"} Points<br />
          <br />


          </div> : "" }
          <div>
          <h1 style={{margin:"0",textDecoration:"underline"}}>{user.teacher_name}{"'s"} Class</h1>

          { this.state.showSlide ? <div style={{padding:"20px"}}>
            <br />
            <TeacherForm teacher={user} />
            <img src="https://www.freelogodesign.org/file/app/client/thumb/c306569e-6f69-46fc-b170-b46ad0cde7cd_200x200.png?1569527074537" height="400px"/>
            <br />Reset Year <span onClick={this.resetYear}>(!)</span>
          </div> : ""}
          </div>

          <div onClick={this.toggleSlide} style={{position:"absolute", textAlign:"right", right:"0"}}> { this.state.showSlide ? "X" : "Show" } </div>

        </TeacherInfo> : ""
    }


}


export default TeacherSlide
