import { ActionTypes } from "../action-types";


const initialState = {
  list : [],
  retrived : false
}
export const getAllSubjectsReducer = (state=initialState, {type,payload})=> {
  switch(type) {
    case ActionTypes.GET_ALL_SUBJECT:
      return {
        ...state,
        list : payload.subjectlist,
        retrived : true
      };
    default:
      return state;
  }
}

