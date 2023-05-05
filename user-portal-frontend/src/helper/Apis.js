const environment = process.env.NODE_ENV;
let base_local_url = 'http://localhost:3001';
let base_backend_url = 'http://localhost:5000';
if(environment==='docker') {
  base_local_url = 'http://user-frontend-app:3001';
  base_backend_url = 'http://backend:5000';
}

const apis = {
  BASE_LOCAL_URL:base_local_url,
  BASE : base_backend_url,
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
  END_TEST : '/api/v1/user/endTest',
  GET_ALL_COMPLETED_TEST_STUDENT : '/api/v1/user/getAllCompletedTest',
  GET_TEST_RESULT_STUDENT:'/api/v1/user/getResultMainDetailsByTestId',
  GET_RESULT_QUESTIONS_STUDENTS : '/api/v1/user/getQuestionAnswerByIds'
}

export default apis;