import React, { useState, useEffect } from "react";
import MangaDexApi from "../../../Services/MangaDexApi";
import "../suggestion.scss";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    (async () => {
      const resp = await fetch(
        `${MangaDexApi.CorsProxy}https://api.mangadex.org/manga/c52b2ce3-7f95-469c-96b0-479524fb7a1a`
      ).then((data) => data.json());
      if (resp.result === "ok") {
        //setList(resp.data);
        setTitle(resp.data.attributes.title.en);
        setDescription(resp.data.attributes.description.en);
        console.log(resp.data);
      }
    })();
  }, []);
  return (
    <>
      
      <div className="bg-image" style={{
        borderRadius : "20px",
        color : "black",
      }}>
        <img 
        style={{
                  //position : 'relative',
                  objectFit : 'cover',
                  width : '100%',
                  height : '100%',
                  filter: 'blur(5px)',
                  WebkitFilter: 'blur(5px)',
                  opacity : '0.5',
                  borderRadius : '20px'
              }}
        
        src="https://comicvine.gamespot.com/a/uploads/scale_large/6/67663/7411447-11.jpg" ></img>
        
      </div>

      <div className="bg-text">
        <h1 style={{
            color : "white"
        }} >{title}</h1>
        <br></br>
        <p>{description}</p>
      </div>
    </>

    // <>
    // <div className="banner-text">
    //     <span>{title}</span>
    //     </div>
    //     <div className="banner">

        
    //     <img style={{
    //         //position : 'relative',
    //         objectFit : 'cover',
    //         width : '100%',
    //         height : '100%',
    //         filter: 'blur(5px)',
    //         WebkitFilter: 'blur(5px)',
    //         opacity : '0.5',
    //         borderRadius : '26px'
    //     }} src="https://comicvine.gamespot.com/a/uploads/scale_large/6/67663/7411447-11.jpg" ></img>

    // </div>
    // </>
  );
};

export default Banner;
