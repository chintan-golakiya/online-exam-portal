import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { getUpcomingTestsStudentAction } from "../../../redux/actions/studentTestAction";
import UpcomingTestTableStudent from "../../molecues/TestTable/UpcomingTestTableStudent";
import TakeTestStudent from "../../molecues/TestView/TakeTestStudent";

const useStyles = (theme)=> ({
  testDetails : {
    margin:'20px',
    display: 'inline-block',
    textAlign : 'center',
  },
  testTitle : {
    fontSize : '1.7em',
    textAlign : 'center',
    margin : '20px'
  }
})

class UpcomingStudentTestsDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    if(this.props.testDetails.upcomingTestRetrived === true) {
      return(<div>
        <div className={this.props.classes.testTitle} color="primary">Upcoming Tests</div>
        <UpcomingTestTableStudent></UpcomingTestTableStudent>
      </div>)
    } else if (this.props.testDetails.viewTestRetrived){
      return(<div>
        <div className={this.props.classes.testTitle} color="primary">Test</div>
        <TakeTestStudent></TakeTestStudent>
      </div>)
    } 
    else {
      
      this.props.getUpcomingTestsStudentAction();
      return (<div></div>)
    }
  }
}

const mapStatetoProps = state => ({
  user : state.user,
  testDetails : state.testDetails
})

export default withStyles(useStyles)(connect(mapStatetoProps,{
  getUpcomingTestsStudentAction
})(UpcomingStudentTestsDetails));