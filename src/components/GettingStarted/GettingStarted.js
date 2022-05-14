import { useState, useEffect } from 'react'
import styles from "./gettingstarted.module.css";
import Basic from "../Basic/Basic";

const GettingStarted = () => {
  return (
    <div className={styles.gettingstarted}>

      {/* Basic */}
      <Basic />
      
    </div>
  )
}

export default GettingStarted