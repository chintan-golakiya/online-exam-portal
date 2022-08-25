import axios from "axios"
import apis from "../../services/Apis"
import { ActionTypes } from "../constants/action-types"
import Auth from "../../services/Auth"


export const getStudentDetails = () => {
    return async(dispatch) => {
      axios.get(apis.BASE + apis.GET_STUDENT_DETAILS, {
        headers : {
          'Authorization':`Bearer ${Auth.retriveToken()}`
        }
      }).then(response => {

        if(response.data.success) {
          dispatch({
            type: ActionTypes.GET_ALL_STUDENT,
            payload : {
              studentlist : response.data.students
            }
          })
        }
      })
    }
}

export const StudentToggleStatus = (status,id,callback) => {
  var apisuffix = status ? apis.REMOVE_USER : apis.UNBLOCK_USER;
  return async() => {
    await axios.post(apis.BASE + apisuffix,{
      _id : id
    },{
      headers:{
        'Authorization':`Bearer ${Auth.retriveToken()}`
      }
    }).then(response => {
      if(response.data.success) {
        callback();
      } else {
        console.log(response.data);
      }
    })
  }
  
}