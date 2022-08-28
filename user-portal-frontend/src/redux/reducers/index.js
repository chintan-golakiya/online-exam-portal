import { combineReducers } from "redux";
import { alertReducer } from "./alert";
import { loginUserReducer } from "./login";

export default combineReducers({
  user : loginUserReducer,
  alertDetails : alertReducer
});