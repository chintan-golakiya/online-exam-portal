import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { AppBar, Toolbar, Typography } from "@material-ui/core";


const useStyles = (theme)=> ({
  
})

class HeaderAppBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    return(
      <div>
        <AppBar
          elevation={0}
        >
          <Toolbar>
            <Typography variant='h5' className={this.props.classes.title}>
              {this.props.title}
            </Typography>
            <Typography variant='h6'>
              welcome, {this.props.user.userDetails.username} !!
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={this.props.classes.addHeight}></div>
      </div>
    )
  }
}

const mapStatetoProps = state => ({
  user : state.user
})

export default withStyles(useStyles)(connect(mapStatetoProps,{})(HeaderAppBar));