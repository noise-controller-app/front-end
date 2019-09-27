import React from 'react'
import axios from 'axios'

class TeacherForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      teacher: {
        teacher_name: props.teacher.teacher_name,
        mic_sensitivity: props.teacher.mic_sensitivity
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
      <input type="text" name="teacher_name" value={this.state.teacher.teacher_name} onChange={this.handleChange}  /><br/>
      Mic Sensitivity: {this.state.teacher.mic_sensitivity}
      <input type="range" min="1" max="10" name="mic_sensitivity" value={this.state.teacher.mic_sensitivity} onChange={this.handleChange} /><br />
      <button type="Submit">Save Changes</button>
    </form>
  }


}

export default TeacherForm
