import axios from "axios"
import apis from "../../services/Apis";
import { ActionTypes } from "../constants/action-types";
import Auth from "../../services/Auth";
import Alert from "../../services/alert";
import { Navigate } from "react-router-dom";

export const loginUser = (details) => {
  return async(dispatch, getState) => {
    const response = await axios.post(apis.BASE+ apis.LOGIN,details);
    if(response.data.success) {
      Auth.storeToken(response.data.token);
      dispatch( {
        type: ActionTypes.LOGIN,
        payload : {
          isLoggedIn : true,
          userDetails : response.data.admin
        }
      })
    } else {
      Auth.deleteToken();
      return Alert('error','invalid data',response.data.message);
    }
  }
}

export const getAdminDetails = () => {
  return async(dispatch) => {
    axios.get(apis.BASE+apis.GET_ADMIN_DETAILS, {
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
      
    })
    
  }
}

export const logoutUser = ()=> dispatch =>{
  Auth.deleteToken();
  dispatch({
     type : ActionTypes.LOGOUT,
     payload : 'Manual Logout'
  })
}