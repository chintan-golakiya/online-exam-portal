import axios from "axios"
import apis from "../../helper/Apis"
import { ActionTypes } from "../action-types";
import Auth from "../../helper/Auth"

export const addQuestionAction = (details) => {
  return async(dispatch)=> {
    const response = await axios.post(apis.BASE + apis.ADD_QUESTION,details,{
      headers:{
        'Authorization':`Bearer ${Auth.retriveToken()}`
      }
    });
    if(response.data.success) {
      dispatch({
        type:ActionTypes.SET_ALERT,
        payload : {
          isAlert : true,
          title : "Success",
          type : "success",
          message : response.data.message
        }
      })
    }
    else {
      dispatch({
        type:ActionTypes.SET_ALERT,
        payload : {
          isAlert : true,
          title : "Submit Error",
          type : "error",
          message : response.data.message
        }
      })
    }
  }
}