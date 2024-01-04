import React, { memo } from "react";
import Additional from "../../../../Components/AdditionalInfo/Additional";
import Volumes from "../../../../Components/VolumesFeed/Volumes";
import styles from "./chapters_tab.module.scss";
import MangaHeader from "../../MangaHeader/MangaHeader";
import MangaSynopsis from "../../MangaSynopsis/MangaSynopsis";
import PopularTab from "../../../../Components/AdditionalInfo/PopularTab";
import { useSelector } from "react-redux";

const ChaptersTab = memo(({ mangaId, mangaInfo }) => {
  const theme = useSelector((state) => state.theme);
  return (
    <>
      {/* <MangaContent mangaId={mangaId} mangaInfo={mangaInfo} ></MangaContent> */}
      <div className={styles.wrapp} >
        <div className="chapters-choose">
          
          <MangaHeader mangaInfo={mangaInfo} />
          
          <Volumes mangaId={mangaId} />

          {/* need to pass stuff */}
          {/* <RelatedSeries /> */}
        </div>
        <div className="more-info" style={{
            backgroundColor : theme.colors.body,
        }}>
          {/* <Additional /> */}
          {/* need to pass stuff */}
          <PopularTab  />
        </div>
      </div>
    </>
  );
});

export default ChaptersTab;
