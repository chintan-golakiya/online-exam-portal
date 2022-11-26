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

export const getTestDetailsFromId = (details) => {
  return async(dispatch) => {
    const response = await axios.post(apis.BASE+ apis.GET_TEST_DETAILS_BY_ID,details,{
      headers:{
        'Authorization':`Bearer ${Auth.retriveToken()}`
      }
    })
    if(response.data.success) {
      dispatch({
        type:ActionTypes.GET_TEST_DETAILS_TEACHER,
        payload : {
          test : response.data.test
        }
      })
    } else {
      dispatch({
        type:ActionTypes.SET_ALERT,
        payload : {
          isAlert : true,
          title : "Could not get test details",
          type : "error",
          message : response.data.message
        }
      })
    }
  }
}

export const goBackToAllTest = () => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.Go_BACK_ALL_TEST_TEACHER,
      payload : ''
    })
  }
}
