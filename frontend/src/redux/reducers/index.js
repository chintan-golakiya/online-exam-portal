import { combineReducers } from "redux";
import { dashBoardCountReducer } from "./counts";
import { loginUserReducer } from "./login";
import { getAllStudentReducer } from "./studentDetails";
import { getAllSubjectsReducer } from "./subjectDetails";
import { getAllTeachersReducer } from "./teacherDetails";

export default combineReducers({
  user : loginUserReducer,
  dashboardDetails : dashBoardCountReducer,
  teachers : getAllTeachersReducer,
  students : getAllStudentReducer,
  subjects : getAllSubjectsReducer
});