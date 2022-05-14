import React, { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import { AiFillCaretRight, AiFillCaretDown } from "react-icons/ai";
import { IoIosCreate } from "react-icons/io";
import { FcFlashOn, FcBearish, FcHome } from "react-icons/fc";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionOnce } from "react-firebase-hooks/firestore";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useHistory, useParams, Link } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";

import { Loading } from "@nextui-org/react";

import NextLoader from "../NextLoader/NextLoader";

import {AiFillFolderAdd, AiFillFileAdd} from "react-icons/ai"
import {FcFolder} from "react-icons/fc";

import Folder from "../Folder/Folder";

const Navbar = () => {
  const history = useHistory();
  var doc_id;
  const [user, loading] = useAuthState(auth);
  const [loader, setLoader] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");
  // let [notesId, setNotesId] = useState([]);
  const [showList, setShowList] = useState(false);

  let [createdFiles, setCreatedFiles] = useState([]);
  let [createdFolders, setCreatedFolders] = useState([]);

  useEffect(() => {
    setLoader(true);
    if (user?.uid) {
      db.collection("UserData")
        .doc("Users")
        .collection("User")
        .doc(user?.uid)
        .collection("userEditor")
        .onSnapshot((querySnapshot) => {
          setCreatedFiles([]);
          querySnapshot.forEach((doc) => {
            setCreatedFiles((prear) => [...prear, doc.data()]);
          });
        });
    }
    setLoader(false);
  }, [user]);

  useEffect(() => {
    if (user?.uid) {
      db.collection("UserData")
        .doc("Users")
        .collection("User")
        .doc(user?.uid)
        .collection("userFolder")
        .onSnapshot((querySnapshot) => {
          setCreatedFolders([]);
          querySnapshot.forEach((doc) => {
            setCreatedFolders((prear) => [...prear, doc]);
          });
        });
    }
  }, [user]);

  // console.log(createdFiles);

  // useEffect(() => {
  //     db.collection("UserData")
  //     .doc("Users")
  //     .collection(user.email)
  //     .doc("editor")
  //     .collection("userEditor")
  //     .orderBy("timestamp", "desc")
  //     .onSnapshot(snapshot => {
  //         console.log(snapshot)
  //         setNotesId(snapshot.docs.map(doc => (
  //             {
  //                 id: doc.id
  //             }
  //         )));
  //     })
  //     console.log(notesId);
  // },[])

  const createNote = () => {
    doc_id = Date.now();
    try {
      db.collection("UserData")
        .doc("Users")
        .collection("User")
        .doc(user?.uid)
        .collection("userEditor")
        .doc(String(doc_id))
        .set(
          {
            fileName: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            doc_id: doc_id,
          },
          { merge: true }
        );
    } catch (err) {
      console.log(err);
    }

    setInput("");
    // setShowModal(false);
  };

  const createPage = () => {
    db.collection("UserData")
      .doc("Users")
      .collection("User")
      .doc(user?.uid)
      .collection("userEditor")
      .add({
        fileName: "Untitled",
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((docRef) => {
        db.collection("UserData")
          .doc("Users")
          .collection("User")
          .doc(user?.uid)
          .collection("userEditor")
          .doc(docRef.id)
          .set(
            {
              doc_id: docRef.id,
            },
            { merge: true }
          );

        history.push(`/view/${docRef.id}`);
      });
  };

  const createFolder = () => {
    db.collection("UserData")
      .doc("Users")
      .collection("User")
      .doc(user?.uid)
      .collection("userFolder")
      .add({
        folderName: "Untitled",
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
  }

  // const modal = (
  //   <Modal size="sm" active={showModal} toggler={() => setShowModal(false)}>
  //     <ModalBody>
  //       <input
  //         value={input}
  //         onChange={(e) => setInput(e.target.value)}
  //         type="text"
  //         className="outline-none w-full"
  //         placeholder="Enter name of document..."
  //         onKeyDown={(e) => e.key === "Enter" && createNote()}
  //       />
  //     </ModalBody>

  //     <ModalFooter>
  //       <Button
  //         color="blue"
  //         buttonType="link"
  //         onClick={(e) => setShowModal(false)}
  //         ripple="dark"
  //       >
  //         Cancel
  //       </Button>
  //       <Button color="blue" onClick={createNote} ripple="light">
  //         Create
  //       </Button>
  //     </ModalFooter>
  //   </Modal>
  // );

  // const changePathName = (id) => {
  //     window.location.pathname = id;
  // }

  //Testing

  const changeFolderName = (e) => {
    db.collection("Userdata")
    .doc("Users")
    .collection("User")
    .doc(user?.uid)
    .collection("userFolder")
    .doc('FDuDZsc7amLmX3UwZ9Xh')
    .set({
      folderName: e.target.value
    })
  }

  return (
    <div className={styles.navbar}>

      <div className={styles.navbar_heading}>noter</div>
      <div className={styles.navbar_list_container}>
        <div className={styles.navbar_list_gs}>
          <div
            className={styles.navbar_list_gsh}
            onClick={() => setShowList(!showList)}
          >
            {showList ? (
              <div className={styles.navbar_list_fi}>
                <AiFillCaretDown />
              </div>
            ) : (
              <div className={styles.navbar_list_fi}>
                <AiFillCaretRight />
              </div>
            )}
            {/* <div className={styles.navbar_list_fi}><AiFillCaretRight /></div> */}
            <div className={styles.navbar_list_gsi}>
              <IoIosCreate />
            </div>
            <p>Getting started</p>
          </div>
          <div className={styles.navbar_list}>
          <div className={styles.navbar_list_fi}>
            <AiFillCaretRight />
          </div>
          <div className={styles.navbar_list_gsi}>
            <FcFlashOn />
          </div>
          <p>Quick Note</p>
        </div>
        <div className={styles.navbar_list}>
          <div className={styles.navbar_list_fi}>
            <AiFillCaretRight />
          </div>
          <div className={styles.navbar_list_gsi}>
            <FcBearish />
          </div>
          <p>Work Space</p>
        </div>
        <div className={styles.navbar_list}>
          <div className={styles.navbar_list_fi}>
            <AiFillCaretRight />
          </div>
          <div className={styles.navbar_list_gsi}>
            <FcHome />
          </div>
          <p>Personal Home</p>
          
        </div>

          
        </div>
        <div
            // className={showList ? styles.notes_lists : styles.notes_lists_hide}
            className= {styles.notes_lists}
          >
            {/* zIndex ? styles.box_9_main_overlay : styles.box_9_main */}
            <div
              className={styles.notes_list}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginTop: "0.2rem",
              }}
            >
              {createdFiles.map((file) => (
                  
                <div style={{ display: "flex", padding: "0.1rem 0" }}>
                  <div className={styles.notes_list_fi}>
                    <AiFillCaretRight />
                  </div>
                  {/* <p onClick={() => history.push(`/editor/${file}`)}>{file}</p> */}
                  <Link to = {`/page/${file.doc_id}`}>{file.fileName}</Link>
                </div>
              ))}
            </div>
          </div>
        

        {
          createdFolders.map((folder) => (
            <Folder 
            id = {folder.id}
            folderName = {folder.data().folderName}
            />
          ))
        }
        
      </div>
      {/* <div className={styles.newPage} onClick={() => setShowModal(true)}>
        <span><AiOutlinePlusCircle/></span>
        <p>New Page</p>
      </div> */}
      <div className={styles.newDoc}>
        <div className={styles.newFolder} onClick = {createFolder}>
          <span><AiFillFolderAdd className={styles.newFolder_icon}/></span>
        </div>
        <div className={styles.newPage} onClick={createPage}>
          <span><AiFillFileAdd className={styles.newFile_icon}/></span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
