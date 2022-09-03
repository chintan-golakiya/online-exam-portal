const environment = process.env.NODE_ENV;

const apis = {
  BASE_LOCAL_URL:environment==='development'?'http://localhost:3001':'',
  BASE : environment==='development'?'http://localhost:5000':'',
  LOGIN : "/api/v1/login",
  GET_USER_DETAILS: "/api/v1/user/details",
  STUDENT_REGISTER: "/api/v1/public/register",
  GET_ALL_SUBJECT: "/api/v1/user/getAllSubjects",
  ADD_QUESTION : '/api/v1/user/addQuestion'
}

export default apis;