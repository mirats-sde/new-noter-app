import React, { useEffect, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import styles from "./editor.module.css";
import { auth, db } from "../../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  doc,
  setDoc,
  getDocs,
  query,
  collection,
  orderBy,
  limit,
} from "firebase/firestore";

const Editor = () => {
  const doc_id = Date.now();
  const [editorTitle, setEditorTitle] = useState("");

  const [user, loading] = useAuthState(auth);
  let [presavedData, setPresavedData] = useState(null);
  // const generateId = () => {
  //     return getDocs(
  //         query(
  //             collection(
  //                 db,
  //                 "UserData",
  //                 "Users",
  //                 user.uid,
  //                 "editorData",
  //                 "userEditorData"
  //             ),
  //             orderBy("id", "desc"),
  //             limit(1)
  //         )
  //     )
  // }
  useEffect(() => {
    if (!loading) {
      if (user) {
        db.collection("UserData")
          .doc("Users")
          .collection("User")
          .doc(user?.uid)
          .collection("userEditor")
          .doc(String(1111112))
          .get()
          .then((data) => {
            setPresavedData(data.data()?.notes);
          });
      }
    }
  }, [user, loading]);

  console.log(presavedData);

  const saveData = async () => {
    await editor
      .save()
      .then((outputData) => {
        console.log("Article data: ", outputData);

        db.collection("UserData")
          .doc("Users")
          .collection("User")
          .doc(user?.uid)
          .collection("userEditor")
          .doc(String(1111112))
          .set(
            {
              title: editorTitle,
              notes: outputData,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              doc_id: 1111112,
            },
            { merge: true }
          );
      })
      .catch((error) => {
        console.log("Saving failed: ", error);
      });
  };

  let editor = new EditorJS({
    holder: "editorjs",
    tools: {
      header: Header,
    },
    // data: presavedData ? {...presavedData} : {},
    data: {
     
    },
    onChange: () => saveData(),
  });

    // editor.isReady.then(() => {
    //   editor.render({
    //       "time" : 1550476186479,
    //       "blocks" : [
    //       {
    //       "type" : "paragraph",
    //       "data" : {
    //       "text" : "The example of text that was written in one of popular text editors."
    //       }
    //       },],
    //       "version" : "2.18.0"
    //   });
    // });

  //   useEffect(() => {
  //     if (presavedData) {
  //       editor.isReady.then(() => {
  //         editor.blocks.render({
  //           blocks: [
  //             {
  //               id: "oUq2g_tl8y",
  //               type: "header",
  //               data: {
  //                 text: "Editor.js",
  //                 level: 2,
  //               },
  //             },
  //           ],
  //         });
  //       });
  //     }
  //   }, [presavedData, editor]);

  return (
    <>
      <h1>Editorrr</h1>
      <div className={styles.main_container}>
        {/* <div className={styles.editor_title}>
                    <input type="text" value={editorTitle} onChange={(e) => setEditorTitle(e.target.value)} placeholder="Enter Your Title" />
                </div> */}
        <div className={styles.container}>
          <div id="editorjs"></div>
        </div>
      </div>
    </>
  );
};

export default Editor;
