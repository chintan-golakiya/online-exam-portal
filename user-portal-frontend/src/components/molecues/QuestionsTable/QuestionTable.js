import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { TableBody, TableCell, TableRow, Table, TableHead, TableContainer, Paper, Button } from "@material-ui/core";
import { changeQuestionStatus, searchQuestionById } from "../../../redux/actions/questionAction";

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



class QuestionTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  viewQuestion = (id) => {
    this.props.searchQuestionById(id);
  }

  onQuestionStatusChange = (event,id,status) => {
    this.props.changeQuestionStatus({id,status:(!status)});
  }

  render() {
    
    return(
      <div className={this.props.classes.tableBorder}>
      <TableContainer component={Paper} className={this.props.classes.table}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead >
            <TableRow>
              <TableCell className={this.props.classes.tableHeader}>No.</TableCell>
              <TableCell align="left" className={this.props.classes.tableHeader}>Question</TableCell>
              <TableCell className={this.props.classes.tableHeader}>Status</TableCell>
              <TableCell className={this.props.classes.tableHeader}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.questionlist.map((question,index)=>(
              <TableRow key={index}>
                <TableCell>{index+1}</TableCell>
                <TableCell onClick={(event)=>(this.viewQuestion(question._id))}>{question.body}</TableCell>
                <TableCell 
                  style={(question.status===true)?{color:'green'}:{color:'red'}}
                >
                  {(question.status===true)?'Active':'Blocked'}
                </TableCell>
                <TableCell> 
                  <Button 
                    onClick={(event)=>(this.onQuestionStatusChange(event,question._id,question.status))}
                    style={(question.status===false)?{background:'#00ff0088'}:{background:'#ff0000aa'}}
                  >
                      {(question.status===true)?'block':'unblock'}
                  </Button> 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
      </TableContainer>
      </div>
    )
  }
}

const mapStatetoProps = state => ({
  questionlist : state.questionDetails.list
})

export default withStyles(useStyles)(connect(mapStatetoProps,{
  changeQuestionStatus,
  searchQuestionById
})(QuestionTable));