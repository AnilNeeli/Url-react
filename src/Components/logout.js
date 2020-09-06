import React from 'react';
import { Redirect} from 'react-router-dom';
import routes from "../routes/routes"
import { useRecoilState } from "recoil";
import { loginState } from "../Recoil/Authenticate";


export default function Logout() {
  const [login, setlogin] = useRecoilState(loginState);

  if(login===false){
    return(
    <Redirect to={routes.login} />)
  }
  if(login===true){
      setlogin(false)
      const login=false
      window.localStorage.setItem('loginstatus',login)
      return(    <Redirect to={routes.login} />)
  }

}
  
