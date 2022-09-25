import axios from "axios"
import apis from "../../helper/Apis"
import Auth from "../../helper/Auth"
import { ActionTypes } from "../action-types"


export const getAllTestStudentAction = () => {
  return async(dispatch) => {
    const response = await axios.get(apis.BASE + apis.GET_ALL_TEST_STUDNET,{
      headers:{
        'Authorization':`Bearer ${Auth.retriveToken()}`
      }
    });
    console.log(response.data);
    if(response.data.success) {
      
      dispatch({
        type : ActionTypes.GET_ALL_TESTS,
        payload : {
          testlist : response.data.testlist
        }
      })
    }
  }
}

export const getUpcomingTestsStudentAction = () => {
  return async(dispatch) => {
    const response = await axios.get(apis.BASE + apis.GET_UPCOMING_TESTS_STUDENT,{
      headers:{
        'Authorization':`Bearer ${Auth.retriveToken()}`
      }
    });
    if(response.data.success) {
      
      dispatch({
        type : ActionTypes.GET_UPCOMING_TESTS_STUDENT,
        payload : {
          testlist : response.data.upcomingtestlist
        }
      })
    }
  }
}

export const studentTestRegister = (details) => {
  return async(dispatch)=>{
    axios.post(apis.BASE + apis.STUDENT_TEST_REGISTER,details, {
      headers : {
        'Authorization':`Bearer ${Auth.retriveToken()}`
      }
    }).then(response => {
      if(response.data.success) {
        dispatch({
          type : ActionTypes.CHANGE_TEST_REGISTER,
          payload : {
            id: details.testid
          }
        })   
      } else {
        console.error(response.data);
        dispatch({
          type:ActionTypes.SET_ALERT,
          payload : {
            isAlert:true,
            type : 'error',
            title : 'error in change status',
            message : response.data.message
          }
        })
      }
    })
  }
}

export const getTestById = (details) => {
  return async(dispatch) => {
    const response = await axios.post(apis.BASE+ apis.GET_TEST_DETAILS_BY_ID,details,{
      headers:{
        'Authorization':`Bearer ${Auth.retriveToken()}`
      }
    })
    if(response.data.success) {
      dispatch({
        type:ActionTypes.VIEW_TEST_DETAILS,
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
