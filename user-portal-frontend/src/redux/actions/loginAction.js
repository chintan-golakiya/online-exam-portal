import apis from "../../helper/Apis";
import { ActionTypes } from "../action-types";
import Auth from "../../helper/Auth";
import axios from "axios";
import { Navigate } from "react-router-dom";

export const loginRequestAction = (details) => {
  return async(dispatch) => {
    const response = await axios.post(apis.BASE+ apis.LOGIN,details);
    if(response.data.success) {
      Auth.storeToken(response.data.token);
      dispatch( {
        type: ActionTypes.LOGIN,
        payload : {
          isLoggedIn : true,
          userDetails : response.data.user
        }
      })
    } else {
      Auth.deleteToken();
      dispatch({
        type:ActionTypes.SET_ALERT,
        payload : {
          isAlert : true,
          title : "Login Failed",
          type : "error",
          message : response.data.message
        }
      })
    }
  }
}


export const logoutUser = ()=> dispatch =>{
  Auth.deleteToken();
  dispatch({
     type : ActionTypes.LOGOUT,
     payload : 'Manual Logout'
  })
  return (<Navigate to='/'/>)
}

export const getUserDetails = () => {
  return async(dispatch) => {
    axios.get(apis.BASE+apis.GET_USER_DETAILS, {
      headers:{
        'Authorization':`Bearer ${Auth.retriveToken()}`
      }
    }).then(response => {
      
        if(response.data.success) {
          dispatch({
            type:ActionTypes.LOGIN,
            payload: {
              isLoggedIn : true,
              userDetails : response.data.user
            }
          })
        } else {
          Auth.deleteToken();
          return (<Navigate to="/"/>);
        }
      
    }).catch(err=> {
      Auth.deleteToken();
      return (<Navigate to="/"/>);
    }) 
    
  }
}