import { Button, withStyles } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import AlertBox from '../../atoms/Alertbox/AlertBox';
import LoginForm from '../../templates/loginForm/loginForm';
import Auth from '../../../helper/Auth';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const useStyles = (theme) => ({
  addHeight : theme.mixins.toolbar,
  title : {
    flexGrow : 1
  },
  main : {
    textAlign : 'center',
    paddingTop : '5%',
    margin : 'auto'
  }
})


class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gotoStudentRegister: false
    }
  }

  onStudentRegisterClick () {
    this.setState({
      ...this.state,
      gotoStudentRegister : true
    })
  }


  render(){
    if(this.state.gotoStudentRegister) {
      return (<Navigate to='/studentRegisterPage'/>)
    }
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
          <AppBar
          elevation={0}
          className={this.props.classes.appbar}
          >
            <Toolbar>
                  <Typography variant='h5' className={this.props.classes.title}>
                    Login 
                  </Typography>
                  <Typography variant='h6'>
                    <Button variant="contained" className={this.props.classes.endtestbtn} onClick={()=>(this.onStudentRegisterClick())}>Student Register</Button>
                  </Typography>
            </Toolbar>
          </AppBar>
          <div className={this.props.classes.addHeight}></div>
          <div className={this.props.classes.main}>
          <AlertBox/>
          <LoginForm/>
          </div>
        </div>
      )
    }
  }
}

const mapStatetoProps = state=>({
  user : state.user
});

export default withStyles(useStyles)(connect(mapStatetoProps,{})(LoginPage));