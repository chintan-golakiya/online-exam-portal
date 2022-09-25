import { Button } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import AlertBox from '../../atoms/Alertbox/AlertBox';
import LoginForm from '../../templates/loginForm/loginForm';
import Auth from '../../../helper/Auth';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }



  render(){
    if(this.props.user.isLoggedIn) {
      if(this.props.user.userDetails.type === 'TEACHER')
        return (<Navigate to='/homeTeacher'/>);
      else
        return (<Navigate to='/homeStudent'/>);
    } else if(Auth.retriveToken() && Auth.retriveToken()!=='undefined'){
      
      return (<Navigate to='/homeStudent'/>);
    } 
    else {
      return (
        <div>
          <AlertBox/>
          loginPage
          <LoginForm/>
          <Button><Link to='/studentRegisterPage'>Student Register</Link></Button>
        </div>
      )
    }
  }
}

const mapStatetoProps = state=>({
  user : state.user
});

export default connect(mapStatetoProps,{})(LoginPage);