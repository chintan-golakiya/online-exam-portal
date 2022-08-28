class Auth {
  constructor(){
    this.token = null;
  }

  retriveToken = ()=>{
    return localStorage.getItem('Token');
  }

  storeToken = (t)=>{
    localStorage.setItem('Token',t);
  }

  deleteToken = ()=>{
    localStorage.removeItem('Token');
  }


}
export default new Auth();;
