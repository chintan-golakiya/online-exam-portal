import { ActionTypes } from "../action-types";

const initialState = {
  isLoggedIn : false,
  userDetails : {}
}

export const loginUserReducer = (state = initialState,{type,payload})=>{
  switch(type) {
    case ActionTypes.LOGIN:
      return {...state,isLoggedIn:payload.isLoggedIn,userDetails:payload.userDetails};
    case ActionTypes.LOGOUT:
      return {...state,isLoggedIn:false,userDetails:{}};
    default :
      return state;
  }
}