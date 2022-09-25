import { ActionTypes } from "../action-types";


const initialState = {
  isRetrived: false,
  test: {},
  answersheet : {},
  questionid : []
}

export const TakeTestReducer = (state = initialState,{type, payload}) => {
  switch(type) {
    case ActionTypes.START_TEST:
      return {
        ...state,
        isRetrived : true,
        test : payload.test,
        answersheet : payload.answersheet,
        questionid : payload.questions
      }
    case ActionTypes.SELECT_ANSWER:
      var newans = state.answersheet;
      newans.answers[payload.index] = payload.ans;
      return {
        ...state,
        answersheet : newans
      }
    case ActionTypes.END_TEST:
      return initialState;
    default:
      return state;
  }
}
