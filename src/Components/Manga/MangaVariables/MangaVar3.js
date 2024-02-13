import React, { useEffect, useRef, useState } from "react";
import { flags } from "../../../Assets/Svg/Flags";
import Img from "../../../SharedUI/StyledComponents/Img/Img";
import "./mangaVariables.scss";
import Rating from '@mui/material/Rating';
import { useSelector } from "react-redux";
import SuggestItem from "../../../Pages/Suggestion/SuggestItem";
import MangaflixApi from "../../../Services/MangaflixApi";
import Spinner from "../../../SharedUI/LoadComponents/Spiner/Spinner";

const MangaVar3 = ({ manga, mangaCover }) => {
  const ref = useRef();
  const theme = useSelector((state) => state.theme);
  // const [value, setValue] = useState(4.5);
  const [cover, setCover] = useState(null);
  console.log("manga", manga);
  console.log("id", manga.id);

  // useEffect(() => {
  //   const fetchCover = async () => {
  //     try {
  //       const resp = await MangaflixApi.getCoverById(manga.id);
  //       // console.log("id",manga.id);
  //       if (resp && resp.poster && resp.poster.thumb) {
  //         setCover(resp.poster.thumb);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching cover:', error);
  //     }
  //   };

  //   fetchCover();
  // }, [manga.id]);

  return (
    <div className="manga-var3-main">


      <div style={{ display: "block", borderRadius: "14px" }} ref={ref}>
        <div className="manga-img-var3">
          <img
            src={manga.poster.thumb}
            draggable={false}
            style={{ width: "100%", height: "100%", borderRadius: "14px" }}
          />
          {/* dont need flag */}
          {/* <div className="flag-img-var2">
                    <img src={flags[manga?.attributes?.originalLanguage]} alt="" />
                </div> */}
        </div>
        <div className="manga-de-var3">
          <p
            style={{
              color: theme.darkmode ? "white" : "black",
              fontSize: 15,
              fontFamily: "Poppins",
              fontWeight: 500,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}     >
            {manga.title.en}

          </p>
        </div>
      </div>
      <Rating name="haf-rating" precision={0.5} size="small" value={manga.rating} readOnly />
      <div style={{ height: "5px" }} />
      <div
        className="manga-var3-button"
      >
        <p>Chapter 1</p>
        <p style={{ color: "gray", fontSize: "9px" }}>{manga.createdAt}</p>
      </div>
      <div style={{ height: "5px" }} />
      <div
        className="manga-var3-button"
      >
        <p style={{ display: "inline", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          Chapter {manga.lastChapter}
        </p>

        <p style={{ color: "gray", fontSize: "9px" }}>{manga.updatedAt}</p>
      </div>
    </div>
  );
};

export default MangaVar3;
