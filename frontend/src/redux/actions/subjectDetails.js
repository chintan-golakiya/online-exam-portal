import axios from "axios"
import apis from "../../services/Apis"
import { ActionTypes } from "../constants/action-types"
import Auth from "../../services/Auth"


export const getSubjectDetails = () => {
    return async(dispatch) => {
      axios.get(apis.BASE + apis.GET_SUBJECT_DETAILS, {
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

export const SubjectToggleStatus = (status,id,callback) => {
  var apisuffix = status ? apis.REMOVE_SUBJECT : apis.UNBLOCK_SUBJECT;
  return async() => {
    await axios.post(apis.BASE + apisuffix,{
      _id : id
    },{
      headers:{
        'Authorization':`Bearer ${Auth.retriveToken()}`
      }
    }).then(response => {
      if(response.data.success) {
        console.log(response.data);
        callback();
      } else {
        console.log(response.data);
      }
    })
  }
  
}