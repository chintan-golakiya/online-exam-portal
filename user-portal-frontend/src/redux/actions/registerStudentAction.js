import axios from "axios"
import apis from "../../helper/Apis"
import { ActionTypes } from "../action-types";

export const registerStudentAction = (details) => {
  return async(dispatch) => {
    const response = await axios.post(apis.BASE + apis.STUDENT_REGISTER,details);
    if(response.data.success) {
      dispatch({
        type:ActionTypes.SET_ALERT,
        payload : {
          isAlert : true,
          title : "Success",
          type : "success",
          message : response.data.message
        }
      })
    }
    else {
      dispatch({
        type:ActionTypes.SET_ALERT,
        payload : {
          isAlert : true,
          title : "Error",
          type : "error",
          message : response.data.message
        }
      })
    }
  }
}