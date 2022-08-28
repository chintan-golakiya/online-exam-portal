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
    default :
      return state;
  }
}