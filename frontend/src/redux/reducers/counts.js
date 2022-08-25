import { ActionTypes } from "../constants/action-types"

const initialState = {
  subjectActive: 0,
  subjectBlocked: 0,
  studentActive : 0,
  studentBlocked : 0,
  teacherActive : 0,
  teacherBlocked : 0,
  retrived : false
}

export const dashBoardCountReducer = (state = initialState, {type,payload})=>{
  switch(type) {
    case ActionTypes.DASHBOARD_COUNT:
      return {
        ...state,
        subjectActive : payload.activeSubject,
        subjectBlocked:payload.blockedSubject,
        studentActive : payload.activeStudent,
        studentBlocked : payload.blockedStudent,
        teacherActive : payload.activeTeacher,
        teacherBlocked : payload.blockedTeacher,
        retrived:payload.retrived
      };
    default:
      return state;
  }
}