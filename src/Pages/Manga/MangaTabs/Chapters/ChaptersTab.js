import React, { memo } from "react";
import Additional from "../../../../Components/AdditionalInfo/Additional";
import Volumes from "../../../../Components/VolumesFeed/Volumes";
import styles from "./chapters_tab.module.scss";
import MangaHeader from "../../MangaHeader/MangaHeader";
import MangaSynopsis from "../../MangaSynopsis/MangaSynopsis";
import PopularTab from "../../../../Components/AdditionalInfo/PopularTab";

const ChaptersTab = memo(({ mangaId, mangaInfo }) => {
  return (
    <>
      {/* <MangaContent mangaId={mangaId} mangaInfo={mangaInfo} ></MangaContent> */}
      <div className={styles.wrapp} >
        <div className="chapters-choose">
          
          <MangaHeader mangaInfo={mangaInfo} />
          
          <Volumes mangaId={mangaId} />
        </div>
        <div className="more-info">
          {/* <Additional /> */}
          <PopularTab></PopularTab>
        </div>
      </div>
    </>
  );
});

export default ChaptersTab;
