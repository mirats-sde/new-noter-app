import React from 'react'
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import styles from "./folder.module.css"
import { FcFolder } from "react-icons/fc";
import { useState, useEffect } from 'react';
import { GrEdit } from "react-icons/gr"
import { AiFillCaretRight,AiFillCaretDown } from "react-icons/ai"
import { BsPlusCircleFill } from "react-icons/bs"
import { AiOutlinePlusCircle } from "react-icons/ai"
import { Link } from 'react-router-dom';

const Folder = ({ id, folderName }) => {
    const [user, loading] = useAuthState(auth);
    const [folderNameEdit, setFolderNameEdit] = useState();
    const [enableEdit, setEnableEdit] = useState(true);
    const [showFolderFiles, setShowFolderFiles] = useState(false);
    const [folderPages, setFolderPages] = useState([]);

    useEffect(() => {
        if (!loading) {
            if (user) {
                db.collection("UserData")
                    .doc("Users")
                    .collection("User")
                    .doc(user?.uid)
                    .collection("userFolder")
                    .doc(id)
                    .get()
                    .then((doc) => {
                        // console.log(doc?.data()?.folderName);
                        setFolderNameEdit(doc?.data()?.folderName)
                    })
            }
        }
    }, [user])

    useEffect(() => {
        if (user?.uid) {
            db.collection("UserData")
                .doc("Users")
                .collection("User")
                .doc(user?.uid)
                .collection("userFolder")
                .doc(id)
                .collection("folderFiles")
                .onSnapshot((querySnapshot) => {
                    setFolderPages([]);
                    querySnapshot.forEach((doc) => {
                        setFolderPages((prear) => [...prear, doc]);
                    });
                });
        }
    }, [user]);

    const createFileUnderPresentFolder = () => {
        // console.log("Entereddddd");
        db.collection("UserData")
            .doc("Users")
            .collection("User")
            .doc(user?.uid)
            .collection("userFolder")
            .doc(id)
            .collection("folderFiles")
            .add({
                fileName: "Untitled",
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
    }

    const changeFolderName = (e) => {
        // console.log(e.target.value)
        setFolderNameEdit(e.target.value);
        db.collection("UserData")
            .doc("Users")
            .collection("User")
            .doc(user?.uid)
            .collection("userFolder")
            .doc(id).set(
                {
                    folderName: e.target.value
                },
                { merge: true }
            )
    };

    return (
        <div className={styles.folderList}>
            <div className={styles.folderListOuter}>
                <div className={styles.folderListLeft}>
                    <span className={styles.folderListLeftIcon}><FcFolder /></span>
                    <input
                        disabled={enableEdit}
                        autoFocus={enableEdit}
                        className={styles.folderInput}
                        value={folderNameEdit}
                        onChange={changeFolderName}
                    />
                </div>
                <div className={styles.folderListRight}>
                    <span><GrEdit onClick={() => setEnableEdit(!enableEdit)} /></span>
                    {
                        showFolderFiles ? (
                            <span><AiFillCaretDown onClick={() => setShowFolderFiles(!showFolderFiles)} /></span>
                        ) :
                        (
                            <span><AiFillCaretRight onClick={() => setShowFolderFiles(!showFolderFiles)} /></span>
                        )
                    }
                </div>
            </div>
            <div className={showFolderFiles ? styles.folderListInner : styles.folderListInner_hide}>
                <div className={styles.folderListInner_pages}>
                    {
                        folderPages.map((page) => (
                            <div className={styles.folderListInner_page}>
                                <span><AiFillCaretRight/></span>
                                {/* {console.log(folderNameEdit)} */}
                                <Link to = {`/folder/${id}/${page.id}`}>{page.data().fileName}</Link>
                            </div>
                        ))
                    }
                </div>
                <div className={styles.folderListInner_newpage} onClick={createFileUnderPresentFolder}>
                <span><AiOutlinePlusCircle /></span>
                <p>New Page</p>
                </div>
            </div>
        </div>
    )
}

export default Folder