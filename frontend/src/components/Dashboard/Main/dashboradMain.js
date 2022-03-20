import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { logoutUser, getUserDetails } from "../../../redux/actions/loginAction";
import Auth from "../../../services/Auth";

class DashboardMain extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  logout(obj) {
    obj.props.logoutUser();
    obj.forceUpdate();
  }

  render(){
    console.log(this.props.user);
    if(!Auth.retriveToken() || Auth.retriveToken()==='undefined'){
      return (<Navigate to='/'/>);
    } else if(!this.props.user.isLoggedIn) {
      this.props.getUserDetails();
    }
    return (<div>
      DashboardMain
      <button onClick={()=>(this.logout(this))}>Logout</button>
      </div>);
  }
}

const mapStateToProps = state => ({
  user:state.user
});

export default connect(mapStateToProps,{
  logoutUser,
  getUserDetails
})(DashboardMain);
