import React from 'react'
import axios from 'axios'

class TeacherForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      teacher: {
        teacher_name: props.teacher.teacher_name,
        mic_sensitivity: props.teacher.mic_sensitivity,
        animal_change_time: props.teacher.animal_change_time
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const headers = { headers: {'Authorization': localStorage.token} }
    axios.put(`https://voicecontrollerbackendapi.herokuapp.com/api/teachers/${this.props.teacher.teacher_id}`, this.state.teacher, headers)
    .then(res => {
      console.log(res)
    })
    .catch(err => {})
  }

  handleChange = (e) => {
    this.setState({teacher: { ...this.state.teacher, [e.target.name]: e.target.value }})
  }


  render() {
    return <form onSubmit={this.handleSubmit}>
      Display Name:<br />
      <input type="text" name="teacher_name" value={this.state.teacher.teacher_name} onChange={this.handleChange} style={{padding:"10px",margin:"5px"}} /><br/>
      Mic Sensitivity: {this.state.teacher.mic_sensitivity}
      <input type="range" min="1" max="10" name="mic_sensitivity" value={this.state.teacher.mic_sensitivity} onChange={this.handleChange} /><br />
      Animal PopUp Time: {this.state.teacher.animal_change_time}
      <input type="range" min="1" max="10" name="animal_change_time" value={this.state.teacher.animal_change_time} onChange={this.handleChange} /><br />
      <button type="Submit"  style={{cursor:"pointer"}} >Save Changes</button>
    </form>
  }


}

export default TeacherForm
