import React from "react";
import styles from "./chapters.module.scss";
import Chapters from "./Chapters";

const Volume = ({ chapter, mangaInfo }) => {
  const { title, chapterNumber, summary } = chapter;

  return (
    <div className={styles.volume_item}>
      {console.log("as",chapter)}
      <div className={styles.volume_title}>
        <p
          style={{
            color: "#0D0D0D",
            fontSize: 18,
            fontFamily: "Fira Sans",
            fontWeight: "500"
          }}
        >
          {title}
        </p>

        <p
          style={{
            color: "#0D0D0D",
            fontSize: 17,
            fontFamily: "Fira Sans",
            fontWeight: "500",
          }}
        >
          Chapter {chapterNumber}
        </p>

        <p
          style={{
            color: "#0D0D0D",
            fontSize: 17,
            fontFamily: "Fira Sans",
            fontWeight: "500",
          }}
        >
          {summary}
        </p>
      </div>
      <Chapters volume={chapter.pages} mangaInfo={mangaInfo} />
    </div>
  );
};

export default Volume;
