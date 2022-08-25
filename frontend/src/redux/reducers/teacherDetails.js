import { ActionTypes } from "../constants/action-types"

const initialState = {
  list : [],
  retrived : false
}
export const getAllTeachersReducer = (state=initialState, {type,payload})=> {
  switch(type) {
    case ActionTypes.GET_ALL_TEACHER:
      return {
        ...state,
        list : payload.teacherlist,
        retrived : true
      };
    default:
      return state;
  }
}
