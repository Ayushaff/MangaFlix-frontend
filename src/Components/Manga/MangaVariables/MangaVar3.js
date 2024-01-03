import React, { useRef } from "react";
import { flags } from "../../../Assets/Svg/Flags";
import Img from "../../../SharedUI/StyledComponents/Img/Img";
import "./mangaVariables.scss";

const MangaVar3 = ({ manga, mangaCover }) => {
  const ref = useRef();

  const handleChapterClick = (chapterNum) => {
    console.log(`Clicked on Chapter ${chapterNum}`);
  };

  return (
    <>
      <div style={{ display: "block", borderRadius: "14px" }} ref={ref}>
        <div className="manga-img-var3">
          <Img
            src={
              "https://comicvine.gamespot.com/a/uploads/scale_large/6/67663/7962845-34.jpg"
            }
            alt=""
            draggable={false}
          />
          {/* don't need flag */}
          {/* <div className="flag-img-var2">
            <img src={flags[manga?.attributes?.originalLanguage]} alt="" />
          </div> */}
        </div>
        <div className="item-summary">
          <h3>Eleceed</h3>

          <div className="chapter-item">
            <div className="button-column">
              <button
                className="chapter-button1"
                onClick={() => handleChapterClick(277)}
              >
                Chapter 277
              </button>

              <button
                className="chapter-button2"
                onClick={() => handleChapterClick(276)}
              >
                Chapter 276
              </button>
            </div>

            <div className="date-column">
              <div className="date1">Dec 19, 23</div>
              <div className="date2">Dec 19, 23</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MangaVar3;
