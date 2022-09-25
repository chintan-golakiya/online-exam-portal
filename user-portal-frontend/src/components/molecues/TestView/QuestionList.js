
import { withStyles } from "@material-ui/styles";
import React from "react";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

const useStyles = (theme) => ({
  main : {
    padding : "20px",
    border : "1px solid",
    borderRadius : "20px"
  },
  li : {
    padding : "5px",
    height: "30px",
    display : "inline-block",
    border : "1px solid",
    width : "60px",
    textAlign : "left"
  }
})

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers:this.props.answers
    }
  }

  render() {
    if(this.state.answers !== undefined){
      if(this.state.answers.length > 0 ) {
      return (<div className={this.props.classes.main}>
        {this.state.answers.map((q,index) => (
          <div key={index} onClick={()=>(this.props.callback(index,this.props.obj))} className={this.props.classes.li}>
          &nbsp; {q!==null ? <CheckCircleIcon color="primary" fontSize="small"/>:<RadioButtonUncheckedIcon color="action" fontSize="small"/>}
          &nbsp; {index+1} 
          </div>
        ))}
      </div>)
      }
    } else {
      return (<div>No questions in test</div>);
    }
  }
}

export default withStyles(useStyles)(QuestionList);

