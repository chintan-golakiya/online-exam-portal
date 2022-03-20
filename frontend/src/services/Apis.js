const environment = process.env.NODE_ENV;

const apis = {
  BASE_LOCAL_URL:environment==='development'?'http://localhost:3000':'',
  BASE : environment==='development'?'http://localhost:5000':'',
  LOGIN : "/api/v1/login/",
  REGISTER_USER : "/api/v1/public/register",
  GET_USER_DETAILS : "/api/v1/user/details"
}

export default apis;