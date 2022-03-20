import { combineReducers } from "redux";
import { loginUserReducer } from "./login";

export default combineReducers({
  user : loginUserReducer
});