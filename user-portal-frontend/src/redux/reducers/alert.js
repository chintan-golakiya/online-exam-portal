import { ActionTypes } from "../action-types";

const initState = {
  isAlert:false,
  type:"",
  title:"",
  message : ""
}

export const alertReducer = (state = initState,{type,payload})=>{
  switch(type) {
    case ActionTypes.SET_ALERT:
      return {...state,isAlert:true,type:payload.type,title:payload.title,message:payload.message};
    case ActionTypes.CLEAR_ALERT:
      return {...state,isAlert:false,type:"",title:"",message:""};
    case ActionTypes.LOGOUT:
        return initState;
    case ActionTypes.END_TEST:
      return {...state,isAlert:true,type:"info",title:"Test Ended",message:""}
    default :
      return state;
  }
}