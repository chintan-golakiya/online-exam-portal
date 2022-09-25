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
  UPDATE_QUESTION : '/api/v1/user/updateQuestion',
  CREATE_QUESTION : '/api/v1/user/createTest',
  GET_ALL_TEST : '/api/v1/user/getAllTest',
  GET_ALL_TEST_STUDNET:'/api/v1/user/getAllTestStudent',
  STUDENT_TEST_REGISTER : '/api/v1/user/testRegistration',
  GET_UPCOMING_TESTS_STUDENT : '/api/v1/user/getUpcomingTests',
  GET_TEST_DETAILS_BY_ID : '/api/v1/user/getTestById',
  START_TEST : '/api/v1/user/startTest',
  GET_QUESTIONS_TAKETEST : '/api/v1/user/getQuenStarttime',
  SAVE_ANSWER : '/api/v1/user/saveAnswer',
  END_TEST : '/api/v1/user/endTest'
}

export default apis;