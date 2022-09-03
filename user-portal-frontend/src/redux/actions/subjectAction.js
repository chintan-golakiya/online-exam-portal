import axios from "axios";
import apis from "../../helper/Apis"
import Auth from '../../helper/Auth'
import { ActionTypes } from "../action-types";

export const getSubjectDetails = () => {
  return async(dispatch) => {
    axios.get(apis.BASE + apis.GET_ALL_SUBJECT, {
      headers : {
        'Authorization':`Bearer ${Auth.retriveToken()}`
      }
    }).then(response => {

      if(response.data.success) {
        dispatch({
          type: ActionTypes.GET_ALL_SUBJECT,
          payload : {
            subjectlist : response.data.subjects
          }
        })
      }
    })
  }
}