import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import React from "react";
import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from "@material-ui/core";
import { selectedOptionAction } from "../../../redux/actions/takeTestAction";


const useStyles = (theme) => ({
  quebody : {
    margin : "15px"
  },
  options : {
    margin : "15px"
  }
})

class TestQuestion extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.question)
    this.state = {
      selectedOption : this.props.taketest.answersheet.answers[parseInt(this.props.question)] || null
    }
  }

  optionSelectHandler(event) {
    this.props.selectedOptionAction({
      index : this.props.question,
      ans : event.target.value
    })
  }

  render() {
    if(this.props.question!==undefined) {
      var que = this.props.taketest.questionid[this.props.question];
      var selectValue = this.props.taketest.answersheet.answers[parseInt(this.props.question)] || null
      return(<div className={this.props.classes.main}>
        <div className={this.props.classes.quebody}>{que.body}</div>
        <FormControl component="fieldset" className={this.props.classes.options}>
          <FormLabel component="legend" >Select Answer</FormLabel>
          <RadioGroup aria-label="gender" name="answer" value={selectValue} onChange={(event)=>(this.optionSelectHandler(event))}>
            <FormControlLabel value={que.options[0]} control={<Radio />} label={que.options[0]} />
            <FormControlLabel value={que.options[1]} control={<Radio />} label={que.options[1]} />
            <FormControlLabel value={que.options[2]} control={<Radio />} label={que.options[2]} />
            <FormControlLabel value={que.options[3]} control={<Radio />} label={que.options[3]} />
          </RadioGroup>
        </FormControl>

      </div>)
    } else {
      return <div>qustion is undefined</div>
    }
  }
}

const mapStatetoProps = state => ({
  taketest : state.takeTestDetails
})

export default withStyles(useStyles)(connect(mapStatetoProps,{
  selectedOptionAction
})(TestQuestion));
