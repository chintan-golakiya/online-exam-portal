import { ActionTypes } from "../action-types";


const initialState = {
  list : [],
  searched : false,
  question : {}
}


export const getQuestionReducer = (state=initialState, {type,payload})=> {
  switch(type) {
    case ActionTypes.SEARCH_QUESTION:
      return {
        ...state,
        list : payload.questionList,
        searched : true,
        answer : -1,
        question : {}
      };
    case ActionTypes.CHANGE_QUESTION_STATUS:
      var newlist = state.list.map((q)=>( q._id===payload.id ? 
        { 
          _id:payload.id, 
          status:payload.status, 
          body:q.body
        } :q ));
      return {
        ...state,
        list : newlist,
        searched : true
      }
    case ActionTypes.VIEW_QUESTION:
      return {
        ...state,
        question : payload,
        searched : false
      }
    case ActionTypes.GET_BACK_TO_SEARCH:
      return {
        ...state,
        searched : true
      }
    default:
      return state;
  }
}