import axios from "axios"
import apis from "../../services/Apis"
import { ActionTypes } from "../constants/action-types"
import Auth from "../../services/Auth"


export const getTeacherDetails = () => {
    return async(dispatch) => {
      axios.get(apis.BASE + apis.GET_TEACHER_DETAILS, {
        headers : {
          'Authorization':`Bearer ${Auth.retriveToken()}`
        }
      }).then(response => {

        if(response.data.success) {
          dispatch({
            type: ActionTypes.GET_ALL_TEACHER,
            payload : {
              teacherlist : response.data.teachers
            }
          })
        }
      })
    }
}

export const TeacherToggleStatus = (status,id,callback) => {
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