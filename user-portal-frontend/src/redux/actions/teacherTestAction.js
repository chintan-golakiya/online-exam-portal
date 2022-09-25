import axios from "axios"
import apis from "../../helper/Apis"
import { ActionTypes } from "../action-types";
import Auth from "../../helper/Auth"

export const createTestAction = (details) => {
  return async(dispatch)=> {
    const response = await axios.post(apis.BASE + apis.CREATE_QUESTION, details, {
      headers:{
        'Authorization':`Bearer ${Auth.retriveToken()}`
      }
    })
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

export const getAllTestAction = () => {
  return async(dispatch)=> {
    await axios.get(apis.BASE + apis.GET_ALL_TEST, {
      headers : {
        'Authorization':`Bearer ${Auth.retriveToken()}`
      }
    }).then(response => {
      if(response.data.success) {
        dispatch({
          type: ActionTypes.GET_ALL_TESTS,
          payload : {
            testlist : response.data.testlist
          }
        })
      }
    })
  }
}

