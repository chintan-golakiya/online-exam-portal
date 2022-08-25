import { connect } from "react-redux"
import React from "react";
import {getStudentDetails, StudentToggleStatus}  from "../../../redux/actions/studentDetails";
import './studentTable.css'


class StudentTable extends React.Component {
    constructor(props) {
      super(props)
      this.state = {}
    }

    handleStatusChange(status, id) {
      this.props.StudentToggleStatus(status,id,this.props.getStudentDetails);
    }

    buttonTextBasedOnStatus(status) {
      if(status === true) {
        return("block");
      } else {
        return("unblock");
      }
    }

    render(){
      if(this.props.students.retrived===false) {
        this.props.getStudentDetails();
        return (<div>Collecting data</div>);
      }

      return (
      <div className="main">
        <h2 className="title">Students</h2> 
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {this.props.students.list.map((val,key)=>{
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
  students : state.students
});

export default connect(mapStateToProps,{
  getStudentDetails,
  StudentToggleStatus
})(StudentTable);