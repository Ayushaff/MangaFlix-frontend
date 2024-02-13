import React, { memo, useEffect } from "react";
import Additional from "../../../../Components/AdditionalInfo/Additional";
import Volumes from "../../../../Components/VolumesFeed/Volumes";
import styles from "./chapters_tab.module.scss";
import MangaHeader from "../../MangaHeader/MangaHeader";
import MangaSynopsis from "../../MangaSynopsis/MangaSynopsis";
import PopularTab from "../../../../Components/AdditionalInfo/PopularTab";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChaptersTab = memo(({ mangaId, mangaInfo }) => {
  const theme = useSelector((state) => state.theme);
  useEffect(() => { }, []);
  return (
    <>
      {/* <MangaContent mangaId={mangaId} mangaInfo={mangaInfo} ></MangaContent> */}
      <div
        className={styles.wrapp}
        style={{
          color: theme.darkmode ? "white" : "black",
        }}
      >
        <div className="chapters-choose">
          <MangaTopBar mangaInfo={mangaInfo} />

          <MangaHeader mangaInfo={mangaInfo} />

          <Volumes mangaId={mangaId} mangaInfo={mangaInfo} />

          {/* need to pass stuff */}
          {/* <RelatedSeries /> */}
        </div>
        <div>
          <MangaTopBar1 mangaInfo={mangaInfo} />
          <div
            className="more-info"
            style={{
              backgroundColor: theme.colors.body,
              width: "89%", // Set width to 100% for mobile view
              padding: "10px 10px 10px 10px",

            }}
          >
            {/* <Additional /> */}
            {/* need to pass stuff */}
            <PopularTab />
          </div>

          <style jsx>{`
    @media (max-width: 640px) {
      /* Adjust styles for smaller screens */
      .more-info {
        padding: 8px !important;
        width: 80% !important;
        margin-left: 20px !important;
      }
    }
  `}</style>
        </div>

      </div>
    </>
  );
});

const MangaTopBar = ({ mangaInfo }) => {
  const theme = useSelector((state) => state.theme);

  return (
    <>
      <div
        className="manga-top-bar"
        style={{
          backgroundColor: theme.colors.body,
          color: theme.darkmode ? "white" : "black",
          fontFamily: "Fira Sans",
          fontWeight: "400",
          wordWrap: "break-word",
          padding: "10px",
          fontSize: "17px", // Adjusted to string value
          width: "auto",
        }}
      >
        Mangaflix{" "}
        <span style={{ color: theme.colors.trendingManga }}>&gt;</span>{" "}
        {mangaInfo?.data?.attributes?.title?.en}
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          /* Adjust styles for smaller screens */
          .manga-top-bar {
            font-size: 17px !important;
            padding: 10px !important;
            width: 80% !important;
          }
        }
      `}</style>
    </>
  );
};




const MangaTopBar1 = ({ mangaInfo }) => {
  const theme = useSelector((state) => state.theme);
  return (
    <>
      <div
        className="manga-top-bar1"
        style={{
          backgroundColor: theme.colors.body,
          color: theme.darkmode ? "white" : "black",
          width: "90%",
          fontFamily: "Fira Sans",
          fontWeight: "400",
          padding: "10px",
        }}
      >
        <b>
          <span
            style={{
              color: "#0D0D0D",
              fontSize: "17px", // Adjusted to string value
              fontFamily: "Fira Sans",
              fontWeight: "800",
              wordWrap: "break-word",
            }}
          >
            {" "}
            Popular{" "}
          </span>
        </b>
      </div>

      <style jsx>{`
  @media (max-width: 640px) {
    .manga-top-bar1 {
      width: 100%; 
      padding: 8px;
    }
  }
`}</style>

    </>
  );
};

export default ChaptersTab;
