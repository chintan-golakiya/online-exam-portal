import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import './header.css';

const useStyles = makeStyles({
  logoimg : {
    margin:0,
    padding:0,
    height:50
  },
  name :{
    margin : 20,
    color:'#07cfda'
  }
})

const theme = createTheme({
  palette:{
    primary:{
      main:'#00000077'
    }
  }
})

export const HomepageHeader = (props)=>{
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <AppBar>
        <Toolbar>
          <img src={props.img} alt="Logo" className={classes.logoimg}/>
          <div className={classes.name} >
            {props.title}
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
      
  );
}