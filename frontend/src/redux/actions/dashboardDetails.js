import axios from "axios"
import apis from "../../services/Apis"
import { ActionTypes } from "../constants/action-types"
import Auth from "../../services/Auth"

export const getDashboardCount = () => {
  return async(dispatch) => {
    axios.get(apis.BASE + apis.GET_DASHBOARD_COUNT, {
      headers : {
        'Authorization':`Bearer ${Auth.retriveToken()}`
      }
    }).then(response => {
      if(response.data.success) {
        dispatch({
          type: ActionTypes.DASHBOARD_COUNT,
          payload : {
            activeStudent: response.data.activeStudent,
            activeSubject: response.data.activeSubject,
            activeTeacher: response.data.activeTeacher,
            blockedStudent: response.data.blockedStudent,
            blockedSubject: response.data.blockedSubject,
            blockedTeacher: response.data.blockedTeacher,
            retrived : true
          }
        })
      }
    })
  }
}