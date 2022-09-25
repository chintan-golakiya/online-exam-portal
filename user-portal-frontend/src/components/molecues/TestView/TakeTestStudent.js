import React from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { getUpcomingTestsStudentAction } from "../../../redux/actions/studentTestAction";
import { Button } from "@material-ui/core";
import { TableBody, TableCell, TableRow, Table, TableContainer, Paper } from "@material-ui/core";
import { getDatePretty, getTimePretty } from "../../../helper/common";
import { setAlert } from "../../../redux/actions/alertAction";
import { startTestAction } from "../../../redux/actions/takeTestAction";
import { Navigate } from "react-router-dom";

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

class TakeTestStudent extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  goBack() {
    this.props.getUpcomingTestsStudentAction();
  }

  onStartTest(event,test) {
    if(test.status==='TEST_STARTED'){
      console.log("start test "+test._id);
      this.props.startTestAction({testid:test._id},test);

    } else {
      this.props.setAlert({
        isAlert : true,
        type : "info",
        title : "Not Started"
      })
    }
    
  }

  render() {
    if(this.props.isTestStarted) {
      console.log('test started');
      return (<Navigate to='/takeTestPage'/>);
    }
    var test = this.props.test;
    return(<div className={this.props.classes.tableBorder}>
      <TableContainer component={Paper} className={this.props.classes.table}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>{test.title}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell style={{textTransform:'lowercase'}}>{test.status}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Marks</TableCell>
              <TableCell>{test.maxmarks}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Duration</TableCell>
              <TableCell>{getTimePretty(test.duration)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Test Start Time</TableCell>
              <TableCell>{getDatePretty(test.startTime)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Test End Time</TableCell>  
              <TableCell>{getDatePretty(test.endTime)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Result Time</TableCell>
              <TableCell>{getDatePretty(test.resultTime)}</TableCell>
              </TableRow>
            <TableRow>
              <TableCell>Start Test</TableCell>
              <TableCell><Button
                  onClick={(event)=>(this.onStartTest(event,test))}>
                    Start Test
              </Button></TableCell>
              </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell><Button onClick={(event)=>(this.goBack(event))}>Back</Button></TableCell>
            </TableRow>
          </TableBody>
        </Table>
        
      </TableContainer>
      
    </div>)
  }
}

const mapStatetoProps = state => ({
  test : state.testDetails.test,
  isTestStarted : state.takeTestDetails.isRetrived
})

export default withStyles(useStyles)(connect(mapStatetoProps,{
  getUpcomingTestsStudentAction,
  setAlert,
  startTestAction
})(TakeTestStudent))