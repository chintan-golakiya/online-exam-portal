import { ActionTypes } from "../action-types"


const initialState = {
  list : [],
  searched : false,
  retrived : false,
  upcomingTestRetrived : false,
  viewTestRetrived : false,
  test : {}
  
}

export const TestReducer = (state=initialState, {type,payload})=> {
  switch(type) {
    case ActionTypes.GET_ALL_TESTS:
      return {
        ...state,
        list : payload.testlist,
        retrived : true,
        upcomingTestRetrived : false,
        searched : false,
        viewTestRetrived : false
      }
    case ActionTypes.CHANGE_TEST_REGISTER:
      var newlist = state.list.map((q)=>(q._id===payload.id ?
        {
          ...q,
          isRegistered : true
        } :q ));
      return {
        ...state,
        list : newlist,
        retrived : true,
        upcomingTestRetrived : false,
        searched : false,
        viewTestRetrived : false
      }
    case ActionTypes.GET_UPCOMING_TESTS_STUDENT:
      return {
        ...state,
        list : payload.testlist,
        retrived : false,
        upcomingTestRetrived : true,
        searched : false,
        viewTestRetrived : false
      }
    case ActionTypes.VIEW_TEST_DETAILS:
      return {
        ...state,
        test : payload.test,
        retrived : false,
        upcomingTestRetrived : false,
        searched : false,
        viewTestRetrived : true
      }
    case ActionTypes.LOGOUT:
      return initialState;


    default:
      return state;
  }
}