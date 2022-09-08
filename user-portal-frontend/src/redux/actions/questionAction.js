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

export const searchQuestion = (details) => {
  return async(dispatch)=>{
    axios.post(apis.BASE + apis.SEARCH_QUESTION,details,{
      headers : {
        'Authorization':`Bearer ${Auth.retriveToken()}`
      }
    }).then(response=>{
      if(response.data.success) {
        dispatch({
          type:ActionTypes.SEARCH_QUESTION,
          payload : {
            questionList : response.data.list
          }
        })
      }
    })
  }
}

export const changeQuestionStatus = (details) => {
  return async(dispatch)=> {
    axios.post(apis.BASE + apis.CHANGE_QUESTION_STATUS, details, {
      headers : {
        'Authorization':`Bearer ${Auth.retriveToken()}`
      }
    }).then(response => {
      if(response.data.success) {
        dispatch({
          type:ActionTypes.CHANGE_QUESTION_STATUS,
          payload : {
            id : details.id,
            status : details.status
          }
        })
      }
      else {
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


export const searchQuestionById = (id) => {
  return async(dispatch)=>{
    axios.post(apis.BASE + apis.GET_QUESTION_BY_ID,{id},{
      headers : {
        'Authorization':`Bearer ${Auth.retriveToken()}`
      }
    }).then(response=>{
      if(response.data.success) {
        var q = response.data.question
        var a = response.data.answer
        dispatch({
          type:ActionTypes.VIEW_QUESTION,
          payload : {
            _id : q._id,
            body : q.body,
            explanation : q.explanation,
            status : q.status,
            subject : q.subject,
            marks : q.marks,
            options : q.options,
            answer : a,
          }
        })
      } else {
        console.error(response.data);
        dispatch({
          type:ActionTypes.SET_ALERT,
          payload : {
            isAlert:true,
            type : 'error',
            title : 'error in view question',
            message : response.data.message
          }
        })
      }
    })
  }
}

export const getAnswerByQuestionId = (id,options) => {
  return async(dispatch)=>{
    axios.post(apis.BASE + apis.GET_ANSWER,{id},{
      headers : {
        'Authorization':`Bearer ${Auth.retriveToken()}`
      }
    }).then(response=>{
      console.log(response);
      console.log(options);
      if(response.data.success) {
        var ans = response.data.queans.answer;
        for(let i = 0; i<options.length;i++) {
          if(options[i]=== ans) {
            dispatch({
              type:ActionTypes.GET_ANSWER,
              payload : i
            })
            break;
          }
        }
      }
      else {
        dispatch({
          type:ActionTypes.GET_ANSWER,
          payload : -2
        })
      }
    })
  }
}

export const goBacktoSearch = () => {
  return async (dispatch)=>{
    dispatch({
      type:ActionTypes.GET_BACK_TO_SEARCH,
      payload : ''
    })
  }
}

export const updateQuestionAction = (details) => {
  return async(dispatch)=> {
    const response = await axios.post(apis.BASE + apis.UPDATE_QUESTION,details,{
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