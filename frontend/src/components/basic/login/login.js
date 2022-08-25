import React from "react";
import { Navigate } from "react-router-dom";
import './login.css';
import { connect } from 'react-redux';
import { loginUser} from '../../../redux/actions/loginAction';




class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username : "",
      password : ""
    }
  }

  usernameInputHandler = (event)=>{
    this.setState({
      ...this.state,
      username : event.target.value
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
    this.props.loginUser({username:this.state.username,password:this.state.password});
  }

  render(){
    if(this.props.user.isLoggedIn) {
      return (<Navigate to='/home'/>);
    }
    else {
      return (
        <div className="login-box">
        	<h2 className='login-box-title'>Admin Login</h2>
	        <form onSubmit={this.handleSubmit}>
		        <div className="user-box">
			        <input autoComplete="off" className="input-field" type="text" value={this.state.username} onChange={this.usernameInputHandler} required />
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