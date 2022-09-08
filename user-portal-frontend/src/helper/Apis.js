const environment = process.env.NODE_ENV;

const apis = {
  BASE_LOCAL_URL:environment==='development'?'http://localhost:3001':'',
  BASE : environment==='development'?'http://localhost:5000':'',
  LOGIN : "/api/v1/login",
  GET_USER_DETAILS: "/api/v1/user/details",
  STUDENT_REGISTER: "/api/v1/public/register",
  GET_ALL_SUBJECT: "/api/v1/user/getAllSubjects",
  ADD_QUESTION : '/api/v1/user/addQuestion',
  SEARCH_QUESTION : '/api/v1/user/searchQuestion',
  CHANGE_QUESTION_STATUS : '/api/v1/user/changeQuestionStatus',
  GET_QUESTION_BY_ID:'/api/v1/user/getQuestionAnswer',
  GET_ANSWER : '/api/v1/user/getAnswer',
  UPDATE_QUESTION : '/api/v1/user/updateQuestion'
}

export default apis;