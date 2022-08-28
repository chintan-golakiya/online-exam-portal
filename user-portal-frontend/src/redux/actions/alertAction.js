import { ActionTypes } from "../action-types"


export const setAlert = (details)=>{
  return async(dispatch) => {
    dispatch({
      type:ActionTypes.SET_ALERT,
      payload : details
    })
  }
}

export const clearAlert = () => {
  return async(dispatch) => {
    dispatch({
      type:ActionTypes.CLEAR_ALERT,
      payload:""
    })
  }
}