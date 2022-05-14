import React from 'react'
import { auth, provider } from "../firebase";
import {useHistory} from "react-router-dom"
const Login = () => {
  const history = useHistory();
  function signin(e) {
    e.preventDefault();
    auth.signInWithPopup(provider).then(() => history.push("/")).catch((err) => {
      alert(err.message);
    });
  }
  return (
    <button onClick={signin}>
      Loginnnnnnn
    </button>
  )
}

export default Login