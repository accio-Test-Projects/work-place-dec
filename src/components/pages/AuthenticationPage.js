import React from 'react'
import { useLocation } from 'react-router-dom';
import { Auth } from '../../firebasConfig';

function AuthenticationPage({type}) {

  let location = useLocation();
  console.log(location)
  return (
    <div>AuthenticationPage for {type}</div>
  )
}

export default AuthenticationPage