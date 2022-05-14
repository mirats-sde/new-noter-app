import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { db, firebase, auth } from "../../firebase";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Checklist from "@editorjs/checklist";
import RawTool from "@editorjs/raw";
import LinkTool from "@editorjs/link";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import CodeTool from "@editorjs/code";
import styles from "./editor.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
// import { MdOutlineModeEditOutline } from "react-icons/md";
import Loader from "../Loader/Loader";
import Navbar from "../Navbar/Navbar";
import Emoji from "../Emoji/Emoji";
import Title from "../Title/Title";

import SimpleImage from "./simple-image";
import "./simple-image.css";
import FileImage from "./file-image";
import "./file-image.css";
import LinkData from "./link";
import "./link.css"

import RawOutput from "../RawOutput/RawOutput";
import RawHtml from "./raw-html";
import "./raw-html.css"

import FolderModal from "../FolderModal/FolderModal";

const View = () => {
  const { id } = useParams();
  console.log(id);
  const [notes, setNotes] = useState(null);
  const [time, setTime] = useState(null);
  const [blocks, setBlocks] = useState(null);
  const [fileName, setFileName] = useState("");
  const fileNameRef = useRef();

  const [loader, setLoader] = useState(false);
  // const [newFileName, setNewFileName] = useState(fileName);
  const [user, loading] = useAuthState(auth);
  // const [showModal, setShowModal] = useState(false);

  const [htmlCode, setHtmlCode] = useState("");

  const [showFolderModal, setShowFolderModal] = useState(false);

  const src = `
        <html>
            <body>${htmlCode}</body>
        </html>
    `

  // useEffect(() => {
  //   const data = fetch('https://urlinfo.herokuapp.com/urlInfo/id?url=https://www.msn.com/en-in/money/technology/bill-gates-says-elon-musk-could-make-twitter-worse-but-that-people-should-never-underestimate-him/ar-AAWVi40?ocid=msedgntp&cvid=ba17139c3b0f40bbaf53435b2d3ced81')
  //   .then((res) => res.json())
  //   .then(data => console.log(data))
  // })

  // UseEffect to fetch data
  useEffect(() => {
    setLoader(true);
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
            for (let block of doc?.data()?.notes?.blocks) {
              console.log(block);
              if (block.type === "table") {
                let data = JSON.parse(block.data.content);
                block.data.content = data;
                console.log(block.data.content);
              }
            }

            // setBlocks(doc?.data()?.notes?.blocks);
            console.log(blocks);

            setBlocks(
              doc?.data()?.notes?.blocks?.map((block) => {

                if (block.type === "table") {
                  block.data.content = JSON.parse(block.data.content);
                }
                if (block.type === "fileimg") {
                  let data = block.data;
                  block.data = {
                    ...data,
                    file: { url: data.url, width: 600, height: 338 },
                  };
                  block.type = "image"
                }
                // if (block.type === "raw") {
                //   setHtmlCode(block.data.html);
                // }
                return block;
              })
            );

            console.log(doc?.data()?.notes?.time);
            setTime(doc?.data()?.notes?.time);
            setFileName(doc?.data()?.fileName);
            fileNameRef.current = doc.data()?.fileName;
            console.log(doc?.data()?.fileName);

            // setNewFileName(doc.data().fileName)
            // console.log(doc.data().notes.blocks);
            setNotes(doc.data());
            setLoader(false);
          });
      }
    }
  }, [user, loading]);

  console.log(notes);
  // console.log(title);
  console.log(time);
  console.log(blocks);
  console.log(fileName);

  const saveData = async () => {
    await editor
      .save()
      .then((outputData) => {
        for (const key in outputData) {
          if (key === "blocks") {
            for (let block of outputData[key]) {
              if (block.type === "table") {
                let stringTable = JSON.stringify(block.data.content);
                block.data.content = stringTable;
              }
              // if (block.type === "raw") {
              //   setHtmlCode(block.data.html);
              // }
            }
          }
        }
        db.collection("UserData")
          .doc("Users")
          .collection("User")
          .doc(user?.uid)
          .collection("userEditor")
          .doc(id)
          .set(
            {
              notes: outputData,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            },
            { merge: true }
          );
      })
      .catch((error) => {
        console.log("Saving failed: ", error);
      });
  };

  console.log(htmlCode);

  const editor = new EditorJS({
    holder: "editorjs",
    onChange: () => saveData(),
    tools: {
      header: {
        class: Header,
        shortcut: "CMD+SHIFT+H",
        config: {
          placeholder: "Enter a header",
          levels: [1, 2, 3, 4],
          defaultLevel: 3,
        },
      },
      checklist: {
        class: Checklist,
        inlineToolbar: true,
      },
      raw: RawTool,
      // // image: SimpleImage,
      // // linkTool: {
      // //   class: LinkTool,
      // // },
      link: {
        class: LinkData
      },
      list: {
        class: List,
        inlineToolbar: true,
        config: {
          defaultStyle: "unordered",
        },
      },
      embed: {
        class: Embed,
        config: {
          services: {
            youtube: true,
            coub: true,
          },
        },
      },
      image: {
        class: SimpleImage,
        inlineToolbar: true,
      },
      fileimg: {
        class: FileImage,
      },
      // // uploadimg: {
      // //   class: UploadImage,
      // //   config: {
      // //     endpoints: {
      // //       byFile: `http://localhost:3000/${id}/uploadFile`, // Your backend file uploader endpoint
      // //       byUrl: `http://localhost:3000/${id}/fetchUrl`, // Your endpoint that provides uploading by Url
      // //     }
      // //   }
      // // },
      quote: Quote,
      table: {
        class: Table,
        inlineToolbar: true,
        config: {
          rows: 2,
          cols: 3,
        },
      },
      delimiter: Delimiter,
      inlineCode: {
        class: InlineCode,
      },
      code: CodeTool,
      rawhtml: {
        class: RawHtml,
      },
    },
    data: {
      // notes
      time: time,
      blocks: blocks,
    },

    placeholder: 'Enter your content here...'
  });

  // useEffect(() => {
  //     fileNameRef.current.value = fileName
  // }, [fileName])

  async function HandleFileNameChange(e) {
    db.collection("UserData")
      .doc("Users")
      .collection("User")
      .doc(user?.uid)
      .collection("userEditor")
      .doc(id)
      .set(
        {
          fileName: e.target.value,
        },
        { merge: true }
      )
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  return (
    <div className={styles.main_editor}>
      <Navbar />

      {loading ? (
        <Loader />
      ) : (
        <div className={styles.main_editor_container}>
          <FolderModal/>
          {/* {modal} */}
          <Emoji type = "page"/>
          {/* <div style={{ height: "43vh" }}>
            <iframe
              srcDoc={src}
              title='output'
              sandbox='allow-scripts'
              frameBorder="0"
              width="100%"
              height="100%"
            />
          </div> */}
          <div className={styles.editor_heading}>
            {/* <input
            type="text"
            ref={fileNameRef}
            className={styles.fileName}
            onChange={HandleFileNameChange}
          // value={fileName}
          /> */}
            <Title type = "page"/>

            {/* <span onClick={() => setShowModal(true)}><MdOutlineModeEditOutline /></span> */}
          </div>

          {/* <RawOutput/> */}

          <div className={styles.main_container}>
            <div className={styles.container}>
              <div id="editorjs" className={styles.editor_container}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default View;
