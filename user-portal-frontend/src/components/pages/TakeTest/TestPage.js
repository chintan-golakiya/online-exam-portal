import { Button, withStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import Timer from "../../molecues/TestView/Timer";
import QuestionList from "../../molecues/TestView/QuestionList";
import TestQuestion from "../../molecues/TestView/TestQuestion";
import AlertBox from '../../atoms/Alertbox/AlertBox';
import { endTestAction } from "../../../redux/actions/takeTestAction";


const useStyles = (theme) => ({
  addHeight : theme.mixins.toolbar,
  title : {
    flexGrow : 1
  },
  flexdiv : {
    display:"flex"
  },
  quelistdiv : {
    width : "18%",
    margin : "50px 10px"
  },
  questiondiv : {
    width : "75%",
    marginLeft : "50px",
    marginTop : "50px"
  },
  endtestbtn : {
    marginLeft : "20px"
  },
  btns : {
    margin : "10px"
  }
})

class TestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curIndex:0
    }
  }

  setCurIndex(x, obj) {
    console.log("set index");
    console.log(obj);
    obj.setState({
      ...obj.state,
      curIndex:x
    })
  }

  goToPrev() {
    if(this.state.curIndex > 0) {
      this.setState({
        ...this.state,
        curIndex: this.state.curIndex-1
      })
    }
  }

  goToNext() {
    if(this.state.curIndex + 1 < this.props.taketest.answersheet.answers.length){
      this.setState({
        ...this.state,
        curIndex : this.state.curIndex+1
      })
    }
  }

  endtest() {
    this.props.endTestAction();
  }

  render() {
    if(this.props.taketest.isRetrived === false) {
      return(<Navigate to='/'/>);
    }
    var timerTime = this.props.taketest.test.duration*1000 - (Date.now()-Date.parse(this.props.taketest.answersheet.startTime));
    return(<div>
      <div>
        <AppBar
          elevation={0}
          className={this.props.classes.appbar}
        >
          <Toolbar>
                <Typography variant='h5' className={this.props.classes.title}>
                  {this.props.taketest.test.title}
                </Typography>
                <Typography variant='h6'> 
                  Time Remaining &nbsp;
                </Typography>
                <Typography variant='h6'> 
                  <Timer time={timerTime}></Timer>
                </Typography>
                <Typography variant='h6'>
                  <Button variant="contained" color="secondary" className={this.props.classes.endtestbtn} onClick={()=>(this.endtest())}>End Test</Button>
                </Typography>
          </Toolbar>
        </AppBar>
        <div className={this.props.classes.addHeight}></div>
      </div>
      <div className={this.props.classes.flexdiv}>
        <div className={this.props.classes.quelistdiv}>
        <QuestionList answers={this.props.taketest.answersheet.answers} callback={this.setCurIndex} obj={this}/>
        </div>
        <div className={this.props.classes.questiondiv}>
          <AlertBox></AlertBox>
        <TestQuestion question={this.state.curIndex} answer={this.props.taketest.answersheet.answers[this.state.curIndex]}/>
        <br/>
        <Button variant="contained" onClick={()=>(this.goToPrev())} className={this.props.classes.btns}>Prev</Button>
        <Button variant="contained" onClick={()=>(this.goToNext())} className={this.props.classes.btns}>Next</Button>
        </div>
        <div>
          
        </div>
      </div>
    </div>)
  }
}


const mapStatetoProps = state => ({
  user : state.user,
  taketest : state.takeTestDetails
})
export default withStyles(useStyles)(connect(mapStatetoProps,{
  endTestAction
})(TestPage)) ;