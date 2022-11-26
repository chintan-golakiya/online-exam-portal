import { ActionTypes } from "../action-types"


const initialState = {
  list : [],
  searched : false,
  retrived : false,
  upcomingTestRetrived : false,
  viewTestRetrived : false,
  completedTestRetrived : false,
  viewTestResult : false,
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
        viewTestRetrived : false,
        completedTestRetrived : false,
        viewTestResult : false
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
        viewTestRetrived : false,
        completedTestRetrived : false,
        viewTestResult : false
      }
    case ActionTypes.GET_UPCOMING_TESTS_STUDENT:
      return {
        ...state,
        list : payload.testlist,
        retrived : false,
        upcomingTestRetrived : true,
        searched : false,
        viewTestRetrived : false,
        completedTestRetrived : false,
        viewTestResult : false
      }
    case ActionTypes.VIEW_TEST_DETAILS:
      return {
        ...state,
        test : payload.test,
        retrived : false,
        upcomingTestRetrived : false,
        searched : false,
        viewTestRetrived : true,
        completedTestRetrived : false,
        viewTestResult : false
      }
    case ActionTypes.GET_ALL_COMPLETED_TEST_STUDENT:
      return {
        ...state,
        list : payload.testlist,
        retrived : false,
        upcomingTestRetrived : false,
        searched : false,
        viewTestRetrived : false,
        completedTestRetrived : true,
        viewTestResult : false
      }

    case ActionTypes.GET_TEST_RESULT_STUDENT:
      return {
        ...state,
        test : payload.test,
        retrived : false,
        upcomingTestRetrived : false,
        searched : false,
        viewTestRetrived : false,
        completedTestRetrived : false,
        viewTestResult : true
      }
    case ActionTypes.GET_RESULT_QUESTIONS_STUDENTS:
      
      var newtest = {
        ...state.test,
        resultQuestion : payload.questions
      }
      return {
        ...state,
        test : newtest,
        retrived : false,
        upcomingTestRetrived : false,
        searched : false,
        viewTestRetrived : false,
        completedTestRetrived : false,
        viewTestResult : true
      }
    case ActionTypes.GET_TEST_DETAILS_TEACHER:
      return {
        ...state,
        test : payload.test,
        retrived : false,
        upcomingTestRetrived : false,
        searched : true,
        viewTestRetrived : false,
        completedTestRetrived : false,
        viewTestResult : false
      }
    case ActionTypes.Go_BACK_ALL_TEST_TEACHER:
      return {
        ...state,
        retrived : true,
        upcomingTestRetrived : false,
        searched : false,
        viewTestRetrived : false,
        completedTestRetrived : false,
        viewTestResult : false
      }
    case ActionTypes.LOGOUT:
      return initialState;


    default:
      return state;
  }
}