import { withStyles } from "@material-ui/styles";
import React from "react";
import { connect } from "react-redux";
import { getSubjectDetails } from '../../../redux/actions/subjectAction';
import { setAlert } from "../../../redux/actions/alertAction";

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
  },
  field : {
    display:'flex'
  },
  fieldkey : {
    display : 'inline-block',
    fontSize: '1.1em',
    padding:'5px',
    margin:'20px 20px 0px 0px',
    minWidth:'40%'
  },
  fieldvalue : {
    display : 'inline-block',
    fontSize: '1.1em',
    padding:'5px',
    margin:'20px 20px 0px 0px',
    minWidth:'60%'
  }
})

const getSecondToStr = (sec) => {
  var h = parseInt(sec/3600);
  var m = parseInt((sec%3600)/60);
  var str = "";
  if(h<10) {
    str += "0"+h+":";
  } else {
    str += h+":";
  }
  if(m<10) {
    str+= "0"+m;
  } else {
    str += m;
  }
  return str;
}

class ViewTest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title :this.props.testDetails.test.title,
      subjects : this.props.testDetails.test.subjects,
      maxmarks : this.props.testDetails.test.maxmarks,
      queTypes : this.props.testDetails.test.queTypes,
      startTime: this.props.testDetails.test.startTime.slice(0,-8),
      endTime : this.props.testDetails.test.endTime.slice(0,-8),
      duration : getSecondToStr(this.props.testDetails.test.duration),
      regStartTime : this.props.testDetails.test.regStartTime.slice(0,-8),
      regEndTime : this.props.testDetails.test.regEndTime.slice(0,-8),
      resultTime :  this.props.testDetails.test.resultTime.slice(0,-8)
    }
  }


  

  

  

  


  findInArray(arr, val) {
    for(let i=0;i<arr.length;i++){
      if(arr[i]===val) {
        return  true;
      }
    }
    return false;
  }
  
  findInArraySubname(arr, sub) {
    for(let i=0;i<arr.length;i++){
      if(arr[i]===sub.id) {
        return  sub.subject + ", ";
      }
    }
    return "";
  }

  getQuesTypesString(arr) {
    var str = "";
    for(let i=0;i<arr.length;i++){
      str = str + arr[i] + " Marks, ";
    }
    return str;
  }

  render() {
    if(this.props.subjectDetails.retrived === false) {
      this.props.getSubjectDetails();
      return (<div></div>);
    }
    return(
      <div className={this.props.classes.formClass}>
        <div className={this.props.classes.formTitle} color="primary">View Test</div>
        <div className={this.props.classes.field}>
          <div className={this.props.classes.fieldkey}>Title</div>
          <div className={this.props.classes.fieldvalue}>{this.state.title}</div>
        </div>
        <div className={this.props.classes.field}>
          <div className={this.props.classes.fieldkey}>Subjects</div>
          <div className={this.props.classes.fieldvalue}>
          {this.props.subjectDetails.list.map((sub)=>(
            this.findInArraySubname(this.state.subjects,sub)
          ))}
          </div>  
        </div>
        <div className={this.props.classes.field}>
          <div className={this.props.classes.fieldkey}>Question Types</div>
          <div className={this.props.classes.fieldvalue}>
            {this.getQuesTypesString(this.state.queTypes)}
          </div>
        </div>
        <div className={this.props.classes.field}>
          <div className={this.props.classes.fieldkey}>Max Marks</div>
          <div className={this.props.classes.fieldvalue}>{this.state.maxmarks}</div>
        </div>
        <div className={this.props.classes.field}>
          <div className={this.props.classes.fieldkey}>Registration Start Time</div>
          <div className={this.props.classes.fieldvalue}>{this.state.regStartTime}</div>
        </div>
        <div className={this.props.classes.field}>
          <div className={this.props.classes.fieldkey}>Registration End Time</div>
          <div className={this.props.classes.fieldvalue}>{this.state.regEndTime}</div>
        </div>
        <div className={this.props.classes.field}>
          <div className={this.props.classes.fieldkey}>Test Start Time</div>
          <div className={this.props.classes.fieldvalue}>{this.state.startTime}</div>
        </div>
        <div className={this.props.classes.field}>
          <div className={this.props.classes.fieldkey}>Test End Time</div>
          <div className={this.props.classes.fieldvalue}>{this.state.endTime}</div>
        </div>
        <div className={this.props.classes.field}>
          <div className={this.props.classes.fieldkey}>Test Duration</div>
          <div className={this.props.classes.fieldvalue}>{this.state.duration} hours</div>
        </div>
        <div className={this.props.classes.field}>
          <div className={this.props.classes.fieldkey}>Result Time</div>
          <div className={this.props.classes.fieldvalue}>{this.state.resultTime}</div>
        </div>
      </div>
    )
  }
}

const mapStatetoProps = state => ({
  subjectDetails : state.subjectDetails,
  testDetails : state.testDetails
})

export default withStyles(useStyles)(connect(mapStatetoProps,{
  getSubjectDetails,
  setAlert
})(ViewTest));