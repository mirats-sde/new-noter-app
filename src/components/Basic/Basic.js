import React from 'react'
import styles from "./basic.module.css";
import { AiFillCaretRight, AiOutlineStar } from "react-icons/ai";
import { BsLink } from "react-icons/bs"
import { BiLock } from "react-icons/bi"
import { IoIosCreate, IoMdSquareOutline } from "react-icons/io"
const Basic = () => {
    return (
        <div>

            {/* Header */}
            <div className={styles.gs_header}>
                <div className={styles.gs_header_left}>
                    <div className={styles.gs_header_left_icon}><IoIosCreate /></div>
                    <p>Getting Started</p>
                </div>
                <div className={styles.gs_header_right}>
                    <p>Share</p>
                    <div className={styles.gs_header_right_icons}><BsLink /></div>
                    <div className={styles.gs_header_right_icons}><BiLock /></div>
                    <div className={styles.gs_header_right_icons}><AiOutlineStar /></div>
                </div>
            </div>


            {/* Getting Started Heading */}
            <div className={styles.gs_heading}>
                <div className={styles.gs_heading_icon}><IoIosCreate /></div>
                <p>Getting Started</p>
                <span>✋Welcome to <b>noter!</b></span>
            </div>


            {/* Basics */}
            <div className={styles.gs_basics}>
                <h3>Here are the basics</h3>
                <div className={styles.gs_basics_line}>
                    <span><IoMdSquareOutline /></span>
                    <p>Click anywhere and just start typing</p>
                </div>
                <div className={styles.gs_basics_line}>
                    <span><IoMdSquareOutline /></span>
                    <p>Hit `/` to see all the types of content you can add - headers, videos, sub pages, etc.</p>
                </div>
                <div className={styles.gs_basics_line}>
                    <span><IoMdSquareOutline /></span>
                    <p>Highlight any text, and use the menu that pops up to like</p>
                </div>
                <div className={styles.gs_basics_line}>
                    <span><IoMdSquareOutline /></span>
                    <p>See the `⋮⋮` to the left of this checkbox on hover? Click and drag to move this line</p>
                </div>
                <div className={styles.gs_basics_line}>
                    <span><IoMdSquareOutline /></span>
                    <p>Click the `+ New Page` button at the bottom of your sidebar to add a new page</p>
                </div>
                <div className={styles.gs_basics_line}>
                    <span><IoMdSquareOutline /></span>
                    <p>Click `Templates` in your sidebar to get started with pre-built pages</p>
                </div>
            </div>
        </div>
    )
}

export default Basic