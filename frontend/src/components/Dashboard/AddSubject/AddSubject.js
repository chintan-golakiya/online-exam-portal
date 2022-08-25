import React from "react"
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Alert from "../../../services/alert";
import Auth from "../../../services/Auth";
import { getAdminDetails } from "../../../redux/actions/loginAction";
import "./AddSubject.css"
import axios from "axios";
import apis from "../../../services/Apis";

class AddSubject extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name : ""
    }
  }

  nameInputHandler = (event)=>{
    this.setState({
      ...this.state,
      name : event.target.value
    });
  }

  
  
  handleSubmit= (event) => {
    event.preventDefault();
    
    console.log(this.state);
    axios.post(apis.BASE + apis.ADD_SUBJECT, {
      name : this.state.name
    },{
      headers:{
        'Authorization':`Bearer ${Auth.retriveToken()}`
      }
    }).then(response => {
      console.log(response.data);
      if(response.data.success) {
        Alert('info','Success',response.data.message);
      } else {
        Alert('error','Failed',response.data.message);
      }
    })
  }

  render(){
    if(!Auth.retriveToken() || Auth.retriveToken()==='undefined'){
      return (<Navigate to='/'/>);
    } else if(!this.props.user.isLoggedIn) {
      this.props.getAdminDetails();
      return (<div></div>)
    }
    return (
      
      <form onSubmit={this.handleSubmit} className="form-class">
        <h2>Add Subject</h2>
        <div>
          <label> Name </label>
          <input type='Text' value={this.state.name} onChange={this.nameInputHandler} required/>
        </div>
        
        <button type="submit"> Add Subject</button>
        <br/>
        <button> <Link className="linkbtn" to='/home'>back</Link></button>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  user:state.user
});

export default connect(mapStateToProps,{
  getAdminDetails
})(AddSubject);