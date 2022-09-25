import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { getAllTestStudentAction } from "../../../redux/actions/studentTestAction";
import TestTableStudent from "../../molecues/TestTable/TestTableStudent";

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

class TestDetailsStudent extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    if(this.props.testDetails.retrived) {
      return(<div>
        <div className={this.props.classes.testTitle} color="primary">All Tests</div>
        <TestTableStudent></TestTableStudent>
      </div>)
    } 
    else {
      this.props.getAllTestStudentAction();
      return (<div></div>)
    }
  }
}

const mapStatetoProps = state => ({
  user : state.user,
  testDetails : state.testDetails
})

export default withStyles(useStyles)(connect(mapStatetoProps,{
  getAllTestStudentAction
})(TestDetailsStudent));