import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { setAlert } from "../../../redux/actions/alertAction";

const useStyles = (theme)=> ({
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    minWidth: 400
  },
  iconButton: {
    padding: 10,
  },
  searchbox:{
    border:'2px solid',
    borderColor:"#3f51b5",
    borderRadius:'30px',
    display:'inline-box',
    padding:'3px 8px',
    margin:10
  }
})

class QuestionSearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query:''
    }
  }

  searchInputHandler(event) {
    this.setState({
      ...this.state,
      query:event.target.value
    })
  }

  searchButtonClick(event){
    if(this.state.query === '') {
      this.props.setAlert({
        isAlert:true,
        type:'error',
        title:'Error',
        message:'Please give input to search'
      })
    }
    console.log(this.state);
    this.props.searchCallback(this.state);
  }
  

  render() {
    return(
      <div className={this.props.classes.searchbox}>
        <InputBase
        className={this.props.classes.input}
        placeholder="Search Question"
        inputProps={{ 'aria-label': 'search Question' }}
        onChange={(event)=>(this.searchInputHandler(event))}
        value={this.state.query}
        />
        <IconButton 
          className={this.props.classes.iconButton} 
          aria-label="search"
          onClick={(event)=>(this.searchButtonClick(event))}
        >
          <SearchIcon />
        </IconButton>
      </div>
    )
  }
}

const mapStatetoProps = state => ({
})

export default withStyles(useStyles)(connect(mapStatetoProps,{
  setAlert
})(QuestionSearchBox));