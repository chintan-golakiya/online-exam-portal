import { withStyles } from "@material-ui/styles";
import React from "react";
import { connect } from "react-redux";
import { saveAnswerAction } from "../../../redux/actions/takeTestAction";
import { endTestAction } from "../../../redux/actions/takeTestAction";
const useStyles = (theme)=>({
  
})

var x = null;

class Timer extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.time);
    this.state = {
      h : parseInt(props.time/3600000),
      m : parseInt(((props.time/1000)%3600)/60),
      s : parseInt((props.time/1000)%60),
      startCountDown : false
    }
  }


  countdown() {
    if(x !== null) {
      clearInterval(x);
    }
    x = setInterval(()=>{
      var h = this.state.h;
      var m = this.state.m;
      var s = this.state.s - 1;
      if(s < 0) {
        this.props.saveAnswerAction();
        s = 59;
        m = m - 1;
        if(m < 0) {
          m = 59;
          h = h - 1;
          if(h < 0 ){
            this.props.endTestAction();
            this.setState({h:0,m:0,s:0,startCountDown : true});
            console.log("test ended");
            clearInterval(x);
            return;
          }
        }
      }
      this.setState({h:h,m:m,s:s, startCountDown: true});
    },1000);
  }

  render() {
    if(this.props.time === undefined) {
      console.log("time not found");
      return (<div></div>);
    }
    if(this.state.startCountDown===false) {
      this.countdown();
    }
    return (<div>{this.state.h}:{this.state.m}:{this.state.s}</div>)
  }

}

const mapStatetoProps = state => ({

})

export default withStyles(useStyles)(connect(mapStatetoProps,{
  saveAnswerAction,
  endTestAction

})(Timer));