import React from "react";
import './homepage.css';
import './homepage.jpeg';
import { Navigate } from 'react-router-dom';
import { HomepageHeader } from "../header/header";
import Login from "../login/login";
import Auth from '../../../services/Auth';

function Homepage(){
  console.log("on home page");
  if(Auth.retriveToken() && Auth.retriveToken()!=='undefined'){
    return (<Navigate to='/user/home'/>);
  }
  else {
    return (
      <div>
          <div className="parallax">
            <HomepageHeader/>
            <Login />
          </div>
      </div>
    );
  }
}

export default Homepage;
