import axios from "axios"
import apis from "../../helper/Apis"
import Auth from "../../helper/Auth"
import { ActionTypes } from "../action-types"
import { Navigate } from "react-router-dom";
import store from "../store";

export const startTestAction = (details, test) => {
  
  return async(dispatch)=> {
    const response = await axios.post(apis.BASE + apis.START_TEST, details, {
      headers : {
        'Authorization' : `Bearer ${Auth.retriveToken()}`
      }
    }).catch(err => {
      console.log(err);
      return;
    })
    if(response.data.success) {
      console.log(response.data);
      var addStartTime = (response.data.answersheet.startTime === undefined)
      const queResponse = await axios.post(apis.BASE + apis.GET_QUESTIONS_TAKETEST,
        {
          answersheetid:response.data.answersheet._id,
          addStartTime:addStartTime,
          questionid:response.data.questions
        }, {
        headers : {
          'Authorization' : `Bearer ${Auth.retriveToken()}`
        }
      }).catch(err => {
        console.log(err);
        return;
      })
      if(queResponse.data.success) {
        if(response.data.answersheet.answers.length > 0) {
          dispatch({
            type: ActionTypes.START_TEST,
            payload : {
              test : test,
              answersheet : {...response.data.answersheet,startTime:queResponse.data.startTime},
              questions : queResponse.data.questions
            }
          })
        }
        else {
          var emptyAns = new Array(response.data.questions.length).fill(null);
          dispatch({
            type: ActionTypes.START_TEST,
            payload : {
              test : test,
              answersheet : {...response.data.answersheet,startTime:queResponse.data.startTime, answers:emptyAns},
              questions : queResponse.data.questions
            }
          })
        }
      } else {
        dispatch({
          type:ActionTypes.SET_ALERT,
          payload : {
            isAlert : true,
            title : "Start Test Error",
            type : "error",
            message : queResponse.data.message
          }
        })
      }
    } 
    else {
      dispatch({
        type:ActionTypes.SET_ALERT,
        payload : {
          isAlert : true,
          title : "Start Test Error",
          type : "error",
          message : response.data.message
        }
      })
    }
  }
}

export const selectedOptionAction = (details) => {
  return async(dispatch)=>{
    dispatch({
      type:ActionTypes.SELECT_ANSWER,
      payload : details
    })
  }
}

export const saveAnswerAction = () => {
  return async(dispatch)=> {
    console.log(store.getState());
    var answersheet =  store.getState().takeTestDetails.answersheet;
    console.log(answersheet.answers);
    axios.post(apis.BASE + apis.SAVE_ANSWER,{answersheetid:answersheet._id,answers: answersheet.answers},{
      headers : {
        'Authorization' : `Bearer ${Auth.retriveToken()}`
      }
    }).then(response=> {
      console.log(response);
      if(response.data.success) {
        if(response.data.testDone) {
          dispatch({
            type : ActionTypes.END_TEST
          })
        }
        console.log("saved answer");
      } else {
        console.log(response.data);
      }
    }).catch(err => {
      console.log(err);
      return;
    })
  }
}

export const endTestAction = () => {
  return async(dispatch)=> {
    console.log(store.getState());
    var answersheet =  store.getState().takeTestDetails.answersheet;
    console.log(answersheet.answers);
    axios.post(apis.BASE + apis.END_TEST,{answersheetid:answersheet._id,answers: answersheet.answers},{
      headers : {
        'Authorization' : `Bearer ${Auth.retriveToken()}`
      }
    }).then(response=> {
      console.log(response);
      if(response.data.success) {
        dispatch({
          type : ActionTypes.END_TEST
        })
        return (<Navigate to='/'/>)
      }
    }).catch(err => {
      console.log(err);
      return;
    })
  }
}