import React from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { TableBody, TableCell, TableRow, Table, TableHead, TableContainer, Paper } from "@material-ui/core";
import { getTestDetailsFromId } from "../../../redux/actions/teacherTestAction";


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

class TestTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  onTestClick(event,id) {
    this.props.getTestDetailsFromId({testid:id});
  }

  render() {
    return(<div className={this.props.classes.tableBorder}>
      <TableContainer component={Paper} className={this.props.classes.table}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead >
            <TableRow>
              <TableCell className={this.props.classes.tableHeader}>No.</TableCell>
              <TableCell align="left" className={this.props.classes.tableHeader}>Test</TableCell>
              <TableCell className={this.props.classes.tableHeader}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.testlist.map((test,index)=>(
              <TableRow key={index}>
                <TableCell>{index+1}</TableCell>
                <TableCell onClick={(event)=>(this.onTestClick(event,test._id))}>{test.title}</TableCell>
                <TableCell>{test.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
      </TableContainer>
    </div>)
  }
}

const mapStatetoProps = state => ({
  testlist : state.testDetails.list
})

export default withStyles(useStyles)(connect(mapStatetoProps,{
  getTestDetailsFromId
})(TestTable));
