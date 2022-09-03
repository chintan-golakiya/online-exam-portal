import { combineReducers } from "redux";
import { alertReducer } from "./alert";
import { loginUserReducer } from "./login";
import { getAllSubjectsReducer } from "./subject";

export default combineReducers({
  user : loginUserReducer,
  alertDetails : alertReducer,
  subjectDetails : getAllSubjectsReducer
});