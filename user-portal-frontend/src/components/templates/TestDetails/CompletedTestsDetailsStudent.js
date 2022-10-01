import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { getCompletedTestsStudentAction } from "../../../redux/actions/studentTestAction";
import CompletedTestTableStudent from "../../molecues/TestTable/CompletedTestTableStudent";
import TestResultStudent from "../../molecues/ResultView/TestResultStudent";

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

class CompletedTestsDetailsStudent extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    if(this.props.testDetails.completedTestRetrived === true) {
      return(<div>
        <div className={this.props.classes.testTitle} color="primary">Completed Tests</div>
        <CompletedTestTableStudent></CompletedTestTableStudent>
      </div>)
    } else if (this.props.testDetails.viewTestResult === true){
      return(<div>
        <div className={this.props.classes.testTitle} color="primary">Test Result</div>
          <TestResultStudent></TestResultStudent>
      </div>)
    } 
    else {
      
      this.props.getCompletedTestsStudentAction();
      return (<div></div>)
    }
  }
}

const mapStatetoProps = state => ({
  user : state.user,
  testDetails : state.testDetails
})

export default withStyles(useStyles)(connect(mapStatetoProps,{
  getCompletedTestsStudentAction
})(CompletedTestsDetailsStudent));