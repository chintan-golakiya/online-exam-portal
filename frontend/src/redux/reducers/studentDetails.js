import { ActionTypes } from "../constants/action-types"

const initialState = {
  list : [],
  retrived : false
}
export const getAllStudentReducer = (state=initialState, {type,payload})=> {
  switch(type) {
    case ActionTypes.GET_ALL_STUDENT:
      return {
        ...state,
        list : payload.studentlist,
        retrived : true
      };
    default:
      return state;
  }
}
