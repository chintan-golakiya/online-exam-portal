import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import QuestionSearchBox from "../../atoms/SearchBox/QuestionSearchBox";
import { searchQuestion } from "../../../redux/actions/questionAction";
import QuestionTable from "../../molecues/QuestionsTable/QuestionTable";
import ViewnUpdateQuestion from "../ViewnUpdateQuestion/ViewnUpdateQuestion";
import { Button } from "@material-ui/core";
import { goBacktoSearch } from "../../../redux/actions/questionAction";

const useStyles = (theme)=> ({
    questionDetails : {
      margin:'20px',
      display: 'inline-block',
      textAlign : 'center',
    }
})

class QuestionDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  backHandler() {
    this.props.goBacktoSearch();
  }

  render(){
    if(this.props.questionDetails.searched === true) {
      return(<div className={this.props.classes.questionDetails}>
        <QuestionSearchBox searchCallback={this.props.searchQuestion}/>
        <QuestionTable/>
      </div>)
    } else if(this.props.questionDetails.question._id !== undefined) {
      return(<div className={this.props.classes.questionDetails}>
        <QuestionSearchBox searchCallback={this.props.searchQuestion} className={this.props.classes.questionDetails}/>
        <br/>
        <ViewnUpdateQuestion className={this.props.classes.questionDetails}/>
        <Button onClick={this.props.goBacktoSearch}>Back</Button>
      </div>)
    }
    else {
      return(<div className={this.props.classes.questionDetails}>
        <QuestionSearchBox searchCallback={this.props.searchQuestion}/>
      </div>)
    }
  }
}

const mapStatetoProps = state => ({
  user : state.user,
  questionDetails : state.questionDetails
})

export default withStyles(useStyles)(connect(mapStatetoProps,{
  searchQuestion,
  goBacktoSearch
})(QuestionDetails));