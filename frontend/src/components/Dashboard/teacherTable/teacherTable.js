import { connect } from "react-redux"
import React from "react";
import {getTeacherDetails, TeacherToggleStatus}  from "../../../redux/actions/teacherDetails";
import './teacherTable.css'


class TeacherTable extends React.Component {
    constructor(props) {
      super(props)
      this.state = {}
    }

    handleStatusChange(status, id) {
      this.props.TeacherToggleStatus(status,id,this.props.getTeacherDetails);
    }

    buttonTextBasedOnStatus(status) {
      if(status === true) {
        return("block");
      } else {
        return("unblock");
      }
    }

    render(){
      if(this.props.teachers.retrived===false) {
        this.props.getTeacherDetails();
        return (<div>Collecting data</div>);
      }

      return (
      <div className="main">
        <h2 className="title">Teachers</h2> 
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {this.props.teachers.list.map((val,key)=>{
            return (
              <tr key={key}>
                <td>{val.name}</td>
                <td>{val.status.toString()}</td>
                <td><button onClick={()=>(this.handleStatusChange(val.status,val.id))}>{this.buttonTextBasedOnStatus(val.status)}</button></td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>)
    }
}

const mapStateToProps = state => ({
  teachers : state.teachers
});

export default connect(mapStateToProps,{
  getTeacherDetails,
  TeacherToggleStatus
})(TeacherTable);