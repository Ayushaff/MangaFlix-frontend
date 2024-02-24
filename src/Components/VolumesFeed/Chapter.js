import React, { useEffect, useState, useRef } from "react";
import styles from "./chapters.module.scss";
import { compareDates } from "../../Utils/compareDates";
import { useNavigate } from "react-router-dom";

const Chapter = ({ chapter, mangaInfo }) => {
  const [chName, setChName] = useState("");
  const contentBlock = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (chapter) setChName(chapter.title);
  }, [chapter]);

  const redirectToReader = () => {
    navigate(`/chapter/${chapter.chapterId}`);
  };

  return (
    <div className={styles.chapters_block}>
      <div className={styles.chapters_block_main}>
        <div
          className={styles.title}
          onClick={redirectToReader}
          style={{
            color: "#0D0D0D",
            fontSize: 18,
            fontFamily: "Fira Sans",
            fontWeight: "500"
          }}
        >
          {chName}
        </div>
        <div
          style={{
            color: "#6D6D6D",
            fontSize: 15,
            fontFamily: "Fira Sans",
            fontWeight: "500",
            marginTop: 5,
          }}
        >
          {compareDates(chapter.publishedAt)}
        </div>
      </div>

      <div
        className={styles.content_wrapp}
        ref={contentBlock}
      >
        {/* Render additional content if needed */}
      </div>
    </div>
  );
};

export default Chapter;
