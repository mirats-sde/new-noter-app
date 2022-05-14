import React from 'react'
import Navbar from "../Navbar/Navbar";
import GettingStarted from '../GettingStarted/GettingStarted';
import Login from '../Login';
import Emoji from '../Emoji/Emoji';
import styles from "./main.module.css"
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, firebase, auth, provider } from "../../firebase";
import {useHistory} from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  // sendEmailVerification
} from "firebase/auth";
import View from "../Editor/View";

const Main = () => {
  const history = useHistory();
  const [user, loading] = useAuthState(auth);
  const path = window.location.pathname;
  console.log(path);
  let component;
  useEffect(() => {
    if(!loading){
      if(!user){
        history.push("/login")
      }
    }
  },[user, loading])

  // function signout(e) {
  //   e.preventDefault();
  //   auth.signInOut(provider).catch((err) => {
  //     alert(err.message);
  //   });
  // }

  async function LogoutUser() {
    await signOut(auth);
  }

  if(path === "/"){
    component = <GettingStarted/>
  }
  else if(path === "/login"){
    component = <Login/>
  }
  else if(path === "emoji"){
    component = <Emoji/>
  }

  return (
    <div className={styles.main}>
        <Navbar/>
        {/* {
          path === "/" ? <GettingStarted/> : (path !== "login" || path !== "emoji") ? <View/> : <GettingStarted/>
        } */}
        
        {/* <button onClick={LogoutUser}>Sign Out</button> */}

        {
          path === "/" ? <GettingStarted/> : <></>
        }

    </div>
  )
}

export default Main