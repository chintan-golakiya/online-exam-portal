import { withStyles } from "@material-ui/styles";
import React from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { getCompletedTestsStudentAction } from "../../../redux/actions/studentTestAction";
import { TableCell, TableContainer, Table, TableBody, TableRow, Paper } from "@material-ui/core";
import TestResultViewQuestions from "./TestResultViewQuestions";
import { setAlert } from "../../../redux/actions/alertAction";

const useStyles = (theme)=> ({
  tableBorder:{
    background:'#e7e7e7',
    padding:'15px'
  },
  tableHeader:{
    background:'#3f51b5',
    color:'white'
  }
  
})

class TestResultStudent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      toggleViewQue : false
    }
  }

  onViewQuestions(event, result){
    if(result.status !== 'RESULT_DECLARED') {
      this.props.setAlert({
        type : 'info',
        title:'No Result',
        message : 'test result is not declared'
      })
      return;
    }
    this.setState({
      ...this.state,
      toggleViewQue : !this.state.toggleViewQue
    })
  }

  goBack() {
    this.props.getCompletedTestsStudentAction();
  }

  render() {
    var test = this.props.test
    return (<div> 
      <TableContainer component={Paper} className={this.props.classes.table}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>{test.title}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>{this.props.user.username}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell style={{textTransform:'lowercase'}}>{test.status}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Subjects</TableCell>
              <TableCell>{test.subjects}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Marks</TableCell>
              <TableCell>{test.maxmarks}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Obtained Marks</TableCell>
              <TableCell>{test.status === 'RESULT_DECLARED' ? test.score : "Result not declared"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Questions</TableCell>
              <TableCell><Button
                  onClick={(event)=>(this.onViewQuestions(event,test))}>
                    View
              </Button></TableCell>
              </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell><Button onClick={(event)=>(this.goBack(event))}>Back</Button></TableCell>
            </TableRow>
          </TableBody>
        </Table>
        
      </TableContainer>
      { this.state.toggleViewQue === true ? <TestResultViewQuestions/>: ""}
      </div>)
  }
}


const mapStatetoProps = state => ({
  test : state.testDetails.test,
  user : state.user.userDetails
})

export default withStyles(useStyles)(connect(mapStatetoProps,{
  getCompletedTestsStudentAction,
  setAlert
})(TestResultStudent));
