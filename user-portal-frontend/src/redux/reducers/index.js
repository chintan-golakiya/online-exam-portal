import { combineReducers } from "redux";
import { alertReducer } from "./alert";
import { loginUserReducer } from "./login";
import { getQuestionReducer } from "./question";
import { getAllSubjectsReducer } from "./subject";
import { TakeTestReducer } from "./taketest";
import { TestReducer } from "./test";

export default combineReducers({
  user : loginUserReducer,
  alertDetails : alertReducer,
  subjectDetails : getAllSubjectsReducer,
  questionDetails : getQuestionReducer,
  testDetails : TestReducer,
  takeTestDetails : TakeTestReducer 
});