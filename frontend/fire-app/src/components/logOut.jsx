import React from "react";
import {useNavigate} from 'react-router-dom';

export default function logOut(){
  const navigate = useNavigate();
  const clear = () =>{
    localStorage.clear()
    navigate('/')
  }
  return(
    <button onClick={clear}>Log Out</button>
  )
}