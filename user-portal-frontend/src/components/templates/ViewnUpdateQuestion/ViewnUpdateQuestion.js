import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { setAlert } from "../../../redux/actions/alertAction";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { getSubjectDetails } from '../../../redux/actions/subjectAction';
import { updateQuestionAction } from "../../../redux/actions/questionAction";
import { TextareaAutosize } from "@material-ui/core";



const useStyles = ()=>({
  questionInput:{
    marginTop:'20px',
    display : 'block'
  },
  optionInput : {
    display:'inline-block',
    margin :'20px 20px 0px'
  },
  inputfield : {
    display : 'block',
    margin : '10px 20px 0px'
  },
  btn : {
    margin : '20px 40px',
    display:'inline-block'
  },
  formClass : {
    margin:'20px',
    display: 'inline-block',
    textAlign : 'center',
    border : '1px solid black',
    borderRadius: '10px',
    padding : '20px'
  },
  
  formTitle:{
    fontSize: '1.7em'
  },
  textarea : {
    fontSize: '1.1em',
    padding:'5px',
    margin:'20px 20px 0px 0px',
    minWidth:'60%'
  }
})



class ViewnUpdateQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id:this.props.question._id,
      body : this.props.question.body,
      options : this.props.question.options,
      subject : this.props.question.subject,
      answer : this.props.question.answer === '' ? 'None' : this.props.question.answer,
      marks : this.props.question.marks,
      explanation : this.props.question.explanation
    }
  }

  bodyInputHandler = (event) => {
    this.setState({
      ...this.state,
      body : event.target.value
    });
  }

  optionInputHandler = (event,i) => {
    var opt = this.state.options
    opt[i] = event.target.value
    this.setState({
      ...this.state,
      options :opt
    })
  }

  subjectInputHandler = (event) => {
    this.setState({
      ...this.state,
      subject : event.target.value
    })
  }

  answerInputHandler = (event) => {
    this.setState({
      ...this.state,
      answer : event.target.value
    })
  }

  setAnswerValue = () => {
    if(this.props.answer < 0) {
      return 
    }
  }

  marksInputHandler = (event) => {
    this.setState({
      ...this.state,
      marks : event.target.value
    })
  }

  explanationInputHandler = (event) => {
    this.setState({
      ...this.state,
      explanation : event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.answer === 'None'){
      console.log('answer error');
      this.props.setAlert({
        isAlert:true,
        type:'error',
        title:'invalid input',
        message:'please select subject'
      })
      return;
    }
    this.props.updateQuestionAction(this.state);
  }

  render() {
    if(this.props.subjectDetails.retrived === false) {
      this.props.getSubjectDetails();
      return (<div></div>);
    }
    return (
      <form className={this.props.classes.formClass} onSubmit={(event)=>(this.handleSubmit(event))}>
        <div className={this.props.classes.formTitle} color="primary">View and Update question</div>
        <TextField
          variant='outlined'
          color="primary"
          className={this.props.classes.questionInput}
          label="Question"
          placeholder='enter question'
          type='text'
          error_text=''
          value={this.state.body}
          onChange={(event)=>(this.bodyInputHandler(event))}
          required
          fullWidth
        />
        <TextField
          variant='outlined'
          color="primary"
          className={this.props.classes.optionInput}
          label="Option A"
          placeholder='enter option'
          type='text'
          error_text=''
          value={this.state.options[0]}
          onChange={(event)=>(this.optionInputHandler(event,0))}
          required
        />
        <TextField
          variant='outlined'
          color="primary"
          className={this.props.classes.optionInput}
          label="Option B"
          placeholder='enter option'
          type='text'
          error_text=''
          value={this.state.options[1]}
          onChange={(event)=>(this.optionInputHandler(event,1))}
          required
        />
        <br/>
        <TextField
          variant='outlined'
          color="primary"
          className={this.props.classes.optionInput}
          label="Option C"
          placeholder='enter option'
          type='text'
          error_text=''
          value={this.state.options[2]}
          onChange={(event)=>(this.optionInputHandler(event,2))}
          required
        />
        <TextField
          variant='outlined'
          color="primary"
          className={this.props.classes.optionInput}
          label="Option D"
          placeholder='enter option'
          type='text'
          error_text=''
          value={this.state.options[3]}
          onChange={(event)=>(this.optionInputHandler(event,3))}
          required
        />
        <br/>
        <TextField
          variant='outlined'
          color="primary"
          className={this.props.classes.optionInput}
          label="Marks"
          placeholder='enter marks'
          type='number'
          error_text=''
          value={this.state.marks}
          onChange={(event)=>(this.marksInputHandler(event))}
          required
          InputProps={{
            inputProps: { 
              max: 4, min: 1 
            }
          }}
        />
        <br/>
        <InputLabel htmlFor='subject-label' className={this.props.classes.optionInput}>Subject</InputLabel>
        <Select
          native
          value={this.state.subject}
          onChange={(event)=>(this.subjectInputHandler(event))}
          label="Subject"
          inputProps={{
            name:'subject',
            id:'subject-label'
          }}
          required
          className={this.props.classes.optionInput}
        >
          {this.props.subjectDetails.list.map((sub) => (
            <option key={sub.id} value={sub.id} >
              {sub.subject}
            </option>
          ))}

        </Select>
        <InputLabel htmlFor='answer-label' className={this.props.classes.optionInput}>Answer</InputLabel>
        <Select
          native
          value={this.state.answer}
          onChange={(event)=>(this.answerInputHandler(event))}
          label="Answer"
          inputProps={{
            name:'answer',
            id:'answer-label'
          }}
          required
          className={this.props.classes.optionInput}
          
        >
          <option value='None'></option>
          <option value={this.state.options[0]}> option A</option>
          <option value={this.state.options[1]}> option B</option>
          <option value={this.state.options[2]}> option C</option>
          <option value={this.state.options[3]}> option D</option>

        </Select>
        <br/>
        <InputLabel htmlFor='explanation-label' className={this.props.classes.optionInput}>Explanation</InputLabel>
        <TextareaAutosize
          variant='outlined'
          color="primary"
          id="explanation"
          placeholder='enter explanation'
          value={this.state.explanation || ''}
          onChange={(event)=>(this.explanationInputHandler(event))}
          className={this.props.classes.textarea}
          minRows={3}
        />
        <br/>
        <Button 
          variant='contained'
          color="primary"
          type='submit'
          className={this.props.classes.btn}
        >
          Submit
        </Button>
      </form>
    )
  }
}

const mapStatetoProps = state => ({
  subjectDetails : state.subjectDetails,
  question : state.questionDetails.question,
  answer : state.questionDetails.answer
})

export default withStyles(useStyles)(connect(mapStatetoProps,{
  getSubjectDetails,
  setAlert,
  updateQuestionAction
})(ViewnUpdateQuestion));