import React, { useState, useEffect } from 'react'
// import Modal from "@material-tailwind/react/Modal";
// import ModalBody from "@material-tailwind/react/ModalBody";
// import ModalFooter from "@material-tailwind/react/ModalFooter";
// import "@material-tailwind/react/tailwind.css";
import styles from "./foldermodal.module.css"
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams, useHistory } from 'react-router-dom';
import { Modal, useModal, Button, Text } from "@nextui-org/react";
import { FcFolder } from "react-icons/fc";
const FolderModal = () => {
    const history = useHistory();
    const { setVisible, bindings } = useModal();

    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };

    const { id } = useParams();
    // console.log(id);
    const [user, loading] = useAuthState(auth);
    const [showFolderModal, setShowFolderModal] = useState(false);
    const [folders, setFolders] = useState([])
    const [presentPage, setPresentPage] = useState([]);

    useEffect(() => {
        if (user?.uid) {
            db.collection("UserData")
                .doc("Users")
                .collection("User")
                .doc(user?.uid)
                .collection("userFolder")
                .onSnapshot((querySnapshot) => {
                    setFolders([]);
                    querySnapshot.forEach((doc) => {
                        setFolders((prear) => [...prear, doc]);
                    });
                });
        }
    }, [user]);

    useEffect(() => {
        db.collection("UserData")
            .doc("Users")
            .collection("User")
            .doc(user?.uid)
            .collection("userEditor")
            .doc(id)
            .get()
            .then((doc) => {
                setPresentPage(doc.data())
            })
    }, [id])

    const movePageToFolder = async (folderid) => {
        console.log(id, folderid);
        await db.collection("UserData")
            .doc("Users")
            .collection("User")
            .doc(user?.uid)
            .collection("userEditor")
            .doc(id)
            .delete({})

        console.log(presentPage);
        await db.collection("UserData")
            .doc("Users")
            .collection("User")
            .doc(user?.uid)
            .collection("userFolder")
            .doc(folderid)
            .collection("folderFiles")
            .add({
                emoji: presentPage.emoji ? presentPage.emoji : "",
                fileName: presentPage?.fileName ? presentPage.fileName : "",
                notes: presentPage?.notes ? presentPage.notes : ""
            })

            history.push(`/folder/${folderid}/${id}`)
    }

    // const modal = (
    //     <Modal
    //         size="regular"
    //         active={showFolderModal}
    //         toggler={() => setShowFolderModal(false)}
    //     >
    //         {
    //             folders.map((folder) => (
    //                 <ModalBody>
    //                     <p onClick={() => movePageToFolder(folder.id)}>{folder?.data()?.folderName}</p>
    //                 </ModalBody>
    //             ))
    //         }
    //     </Modal>
    // )

    const nextmodal = <div>
        <Button auto color="primary" onClick={() => setVisible(true)}>
            Show Folders
        </Button>
        <Modal
            scroll
            width="300px"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            {...bindings}
        >
            <Modal.Header>
                <Text id="modal-title" size={18}>
                    All Folders
                </Text>
            </Modal.Header>
            <Modal.Body>
                {
                    folders.map((folder) => (
                        <Button color="warning" auto flat onPress={() => movePageToFolder(folder.id)} css = {{}}>
                            <FcFolder />
                            {folder?.data()?.folderName}
                        </Button>
                    ))
                }
            </Modal.Body>
            <Modal.Footer>
                <Button auto flat color="error" onClick={() => setVisible(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </div>

    return (
        <div className={styles.folder_modal_container}>
            {/* <button style={{ width: "100px" }} onClick={() => setShowFolderModal(!showFolderModal)}>Show folders</button> */}
            <div className={styles.folder_modal}>
                {/* {modal} */}
                <div className={styles.nextmodal}>
                    {nextmodal}
                </div>
            </div>
        </div>
    )
}

export default FolderModal