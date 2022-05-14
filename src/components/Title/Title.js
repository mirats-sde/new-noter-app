import React from 'react'
import { useState } from 'react';
import styles from "./title.module.css"
import { useParams } from "react-router-dom";
import { db, firebase, auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from 'react';
import Loader from '../Loader/Loader';
const Title = ({ type }) => {
    const { id } = useParams();
    const { folderid, pageid } = useParams();
    const [singlePageTitle, setSinglePageTitle] = useState('');
    const [folderPageTitle, setFolderPageTitle] = useState('');
    const [user, loading] = useAuthState(auth);


    useEffect(() => {
        if (!loading) {
            if (user) {
                db.collection("UserData")
                    .doc("Users")
                    .collection("User")
                    .doc(user?.uid)
                    .collection("userEditor")
                    .doc(id)
                    .get()
                    .then((doc) => {
                        setSinglePageTitle(doc?.data()?.fileName)
                    })
            }
        }

    }, [user])

    useEffect(() => {
        console.log("Running....,", user);
    }, [user])

    const saveSinglePageTitle = (e) => {
        setSinglePageTitle(e.target.value);
        db.collection("UserData")
            .doc("Users")
            .collection("User")
            .doc(user?.uid)
            .collection("userEditor")
            .doc(id).set(
                {
                    fileName: e.target.value
                },
                { merge: true }
            )
    };

    // const saveEmoji = (e) => {
    //     console.log("Target", e.target.value);
    //     setInputStr(e.target.value);
    // }

    useEffect(() => {
        if (!loading) {
            if (user) {
                db.collection("UserData")
                    .doc("Users")
                    .collection("User")
                    .doc(user?.uid)
                    .collection("userFolder")
                    .doc(folderid)
                    .collection("folderFiles")
                    .doc(pageid)
                    .get()
                    .then((doc) => {
                        setFolderPageTitle(doc?.data()?.fileName)
                    })
            }
        }

    }, [user])

    const saveFolderPageTitle = (e) => {
        setFolderPageTitle(e.target.value);
        db.collection("UserData")
            .doc("Users")
            .collection("User")
            .doc(user?.uid)
            .collection("userFolder")
            .doc(folderid)
            .collection("folderFiles")
            .doc(pageid).set(
                {
                    fileName: e.target.value
                },
                { merge: true }
            )
    };


    return (
        // <div>
        //     <div>
        //         <input
        //             className={styles.inputstyle}
        //             value={title === "Untitled" ? "" : title}
        //             onChange={saveTitle}
        //             placeholder="Enter Your Tittle"
        //         // placeholder="Add icon &#128515;"
        //         // onClick={() => setShowPicker(val => !val)}
        //         />
        //         {/* <img
        //             className={styles.emojiicon}
        //             src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
        //             onClick={() => setShowPicker(val => !val)} alt="emoji-icon" /> */}
        //     </div>
        //     {/* {showPicker && <Picker
        //         pickerStyle={{ width: '100%' }}
        //         onEmojiClick={onEmojiClick} />} */}
        // </div>

        type === "page" ? <div>
            <div>
                <input type="text"
                    className={styles.inputstyle}
                    value={singlePageTitle === "Untitled" ? "" : singlePageTitle}
                    onChange={saveSinglePageTitle}
                />
            </div>
        </div> :
            <div>
                <div>
                    <input type="text"
                        className={styles.inputstyle}
                        value={folderPageTitle === "Untitled" ? "" : folderPageTitle}
                        onChange={saveFolderPageTitle}
                    />
                </div>
            </div>

    )
}

export default Title