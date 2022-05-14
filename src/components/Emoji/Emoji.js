// import React from 'react'
// import Picker from 'emoji-picker-react';
// import { useState } from 'react';
// import InputEmoji from 'react-input-emoji'
// import styles from "./emoji.module.css"
// import { useParams } from "react-router-dom";
// import { db, firebase, auth } from "../../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useEffect } from 'react';
// const Emoji = () => {
//     const { id } = useParams();
//     const [inputStr, setInputStr] = useState('');
//     const [showPicker, setShowPicker] = useState(false);
//     const [user, loading] = useAuthState(auth);

//     useEffect(() => {
//         db.collection("UserData")
//             .doc("Users")
//             .collection("User")
//             .doc(user?.uid)
//             .collection("userEditor")
//             .doc(id)
//             .get()
//             .then((doc) => {

//                 setInputStr(doc?.data()?.emoji)

//             })
//     }, [])

//     const onEmojiClick = (event, emojiObject) => {
//         console.log(emojiObject)
//         setInputStr(emojiObject.emoji);
//         db.collection("UserData")
//             .doc("Users")
//             .collection("User")
//             .doc(user?.uid)
//             .collection("userEditor")
//             .doc(id).set(
//                 {
//                     emoji: emojiObject.emoji
//                 },
//                 { merge: true }
//             )
//         setShowPicker(false);
//     };

//     // const saveEmoji = (e) => {
//     //     console.log("Target", e.target.value);
//     //     setInputStr(e.target.value);
//     // }

//     return (
//         <div className={inputStr?.length > 0 ? styles.app_dec_width : styles.app}>
//             <div className={styles.pickercontainer}>
//                 <input
//                     className={styles.inputstyle}
//                     value={inputStr}
//                     // onChange={saveEmoji}
//                     placeholder="Add icon &#128515;"
//                     onClick={() => setShowPicker(val => !val)}
//                 />
//                 {/* <img
//                     className={styles.emojiicon}
//                     src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
//                     onClick={() => setShowPicker(val => !val)} alt="emoji-icon" /> */}
//             </div>
//             {showPicker && <Picker
//                 pickerStyle={{ width: '100%' }}
//                 onEmojiClick={onEmojiClick} />}
//         </div>
//     )
// }

// export default Emoji


import React from 'react'
import Picker from 'emoji-picker-react';
import { useState } from 'react';
import InputEmoji from 'react-input-emoji'
import styles from "./emoji.module.css"
import { useParams } from "react-router-dom";
import { db, firebase, auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from 'react';
const Emoji = ({type}) => {
    const { id } = useParams();
    const { folderid, pageid } = useParams();
    const [inputStrPage, setInputStrPage] = useState('');
    const [inputStrFolderPage, setInputStrFolderPage] = useState('');
    const [showPickerPage, setShowPickerPage] = useState(false);
    const [showPickerFolderPage, setShowPickerFolderPage] = useState(false);
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        db.collection("UserData")
            .doc("Users")
            .collection("User")
            .doc(user?.uid)
            .collection("userEditor")
            .doc(id)
            .get()
            .then((doc) => {
                setInputStrPage(doc?.data()?.emoji)
            })
    }, [])

    useEffect(() => {
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
                setInputStrFolderPage(doc?.data()?.emoji)
            })
    }, [])

    const onEmojiClickPage = (event, emojiObject) => {
        console.log(emojiObject)
        setInputStrPage(emojiObject.emoji);
        db.collection("UserData")
            .doc("Users")
            .collection("User")
            .doc(user?.uid)
            .collection("userEditor")
            .doc(id).set(
                {
                    emoji: emojiObject.emoji
                },
                { merge: true }
            )
        setShowPickerPage(false);
    };

    const onEmojiClickFolderPage = (event, emojiObject) => {
        console.log(emojiObject);
        setInputStrFolderPage(emojiObject.emoji);
        db.collection("UserData")
            .doc("Users")
            .collection("User")
            .doc(user?.uid)
            .collection("userFolder")
            .doc(folderid)
            .collection("folderFiles")
            .doc(pageid)
            .set({
                emoji: emojiObject.emoji
            },
            {merge: true}
            )
            setShowPickerFolderPage(false)
    }

    // const saveEmoji = (e) => {
    //     console.log("Target", e.target.value);
    //     setInputStr(e.target.value);
    // }



    return (
        type === "page" ? 
        <div className={inputStrPage?.length > 0 ? styles.app_dec_width : styles.app}>
            <div className={styles.pickercontainer}>
                <input
                    className={styles.inputstyle}
                    value={inputStrPage}
                    // onChange={saveEmoji}
                    placeholder="Add icon &#128515;"
                    onClick={() => setShowPickerPage(val => !val)}
                />
                {/* <img
                    className={styles.emojiicon}
                    src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                    onClick={() => setShowPicker(val => !val)} alt="emoji-icon" /> */}
            </div>
            {showPickerPage && <Picker
                pickerStyle={{ width: '100%' }}
                onEmojiClick={onEmojiClickPage} />}
        </div> : 
        <div className={inputStrFolderPage?.length > 0 ? styles.app_dec_width : styles.app}>
        <div className={styles.pickercontainer}>
            <input
                className={styles.inputstyle}
                value={inputStrFolderPage}
                // onChange={saveEmoji}
                placeholder="Add icon &#128515;"
                onClick={() => setShowPickerFolderPage(val => !val)}
            />
            {/* <img
                className={styles.emojiicon}
                src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                onClick={() => setShowPicker(val => !val)} alt="emoji-icon" /> */}
        </div>
        {showPickerFolderPage && <Picker
            pickerStyle={{ width: '100%' }}
            onEmojiClick={onEmojiClickFolderPage} />}
    </div>

    )
}

export default Emoji