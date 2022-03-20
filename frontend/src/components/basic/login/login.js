import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import './login.css';
import { connect } from 'react-redux';
import Alert from "../../../services/alert";
import { loginUser} from '../../../redux/actions/loginAction';




class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email : "",
      password : ""
    }
  }

  emailInputHandler = (event)=>{
    this.setState({
      ...this.state,
      email : event.target.value
    });
  }

  passwordInputHandler = (event) => {
    this.setState({
      ...this.state,
      password : event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.loginUser({email:this.state.email,password:this.state.password});
  }

  render(){
    if(this.props.user.isLoggedIn) {
      return (<Navigate to='/user/home'/>);
    }
    else {
      return (
        <div className="login-box">
        	<h2>Login</h2>
	        <form onSubmit={this.handleSubmit}>
		        <div className="user-box">
			        <input autoComplete="off" className="input-field" type="email" value={this.state.email} onChange={this.emailInputHandler} required />
			        <label>Username</label>
		        </div>
		      <div className="user-box">
			      <input autoComplete="off" className="input-field" type="password" value={this.state.password} onChange={this.passwordInputHandler} required/>
			      <label>Password</label>
		      </div>
		      <button className="button" type="submit" >
			      <span></span>
			      <span></span>
			      <span></span>
			      <span></span>
            LOGIN
		      </button>
	        </form>
        </div>
      );
    }
  }
}


const mapStateToProps = state => ({
  user : state.user
});

const mapDispatchToProps = {
  loginUser
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);