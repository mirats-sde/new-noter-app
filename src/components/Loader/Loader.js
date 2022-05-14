import React from 'react'
import styles from "./loader.module.css"
const Loader = () => {
    return (
        <div className={styles.loader_container}>
            <div className={styles.container}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
        </div>
        </div>
        
        
    )
}

export default Loader