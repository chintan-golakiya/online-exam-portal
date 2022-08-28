import React from "react";
import { connect } from "react-redux";
import LogoutButton from "../../atoms/LogoutButton/LogoutButton";
import Auth from "../../../helper/Auth";
import { Navigate } from "react-router-dom";
import { getUserDetails } from "../../../redux/actions/loginAction";

class StudentHomepage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {}
  }

  render(){
    if(!Auth.retriveToken() || Auth.retriveToken()==='undefined'){
      return (<Navigate to='/'/>);
    } else if(!this.props.user.isLoggedIn) {
      this.props.getUserDetails();
      return (<div></div>);
    } else if(this.props.user.userDetails.type !== 'STUDENT') {
      return (<Navigate to='/'/>);
    }
    return(
      <div>
        Student Homepage
        <LogoutButton/>
      </div>
    )
  }
}

const mapStatetoProps = state => ({
  user:state.user
})

export default connect(mapStatetoProps,{
  getUserDetails
})(StudentHomepage);