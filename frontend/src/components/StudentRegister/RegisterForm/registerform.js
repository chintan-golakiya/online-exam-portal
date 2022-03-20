import React from "react";
import Alert from "../../../services/alert";
import apis from '../../../services/Apis';
import axios from "axios";
import { connect } from "react-redux";
import './registerform.css';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      email:"",
      password:""
    };
  }

  nameInputHandler = (event)=>{
    this.setState({
      ...this.state,
      name : event.target.value
    });
  }
  
  emailInputHandler = (event)=>{
    this.setState({
      ...this.state,
      email : event.target.value
    });
  }

  passwordInputHandler = (event)=>{
    this.setState({
      ...this.state,
      password : event.target.value
    });
  }

  handleSubmit= async (event) => {
    event.preventDefault();
    const details = {
      name : this.state.name,
      email : this.state.email,
      password : this.state.password
    }
    const response = await axios.post(apis.BASE+ apis.REGISTER_USER,details);
    if(response.data.success) {
      Alert("info","Suceess",response.data.message);
    } else {
      Alert("error","Failure",response.data.message);
    }
  }

  render() {
    return (
      <div class="register-box" onSubmit={this.handleSubmit}>
        <h2>Student Registration</h2>
        <form>
          <div>
            <label>Name</label>
            <input type="text" value={this.state.name} onChange={this.nameInputHandler} required/>
          </div>
          <div>
            <label>Email</label>
            <input type="email" value={this.state.email} onChange={this.emailInputHandler} required />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={this.state.password} onChange={this.passwordInputHandler} required />
          </div>
          <button className="button" type="submit">
            REGISTER
          </button>
        </form>
      </div>
    )    
  }
}

const mapStateToProps = state => ({
  user : state.user
});

const mapDispatchToProps = {}

export default connect(mapStateToProps,mapDispatchToProps)(RegisterForm);