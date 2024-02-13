import React, { useEffect, useRef, useState } from 'react';
import Img from '../../../SharedUI/StyledComponents/Img/Img';
import './mangaVariables.scss';
import { useSelector } from 'react-redux';
import MangaflixApi from '../../../Services/MangaflixApi';
import Spinner from '../../../SharedUI/LoadComponents/Spiner/Spinner';
import { useNavigate } from 'react-router';

const MangaVar2 = ({ manga }) => {
    const ref = useRef();
    const theme = useSelector((state)=>state.theme);
    const [cover, setCover] = useState(null); // Initialize cover state as null
    const navigate = useNavigate();

    // useEffect(() => {
    //     const fetchCover = async () => {
    //         try {
    //             const resp = await MangaflixApi.getCoverById(manga.id);
    //             console("resp",resp)
    //             setCover(resp.poster.thumb); 
    //         } catch (error) {
    //             console.error('Error fetching cover:', error);
    //         }
    //     };
    //     fetchCover();
    // }, [manga.id]); // Fetch cover when manga ID changes

    const handleClick = () => {
        navigate(`/manga/${manga.id}`);
    }

    return (
        <div onClick={handleClick} style={{display: "block", borderRadius :"14px"}} ref={ref}>
            <div className="manga-img-var2">
                {
                    <Img src={manga.poster.thumb} alt='' draggable={false} ></Img>
                }
            </div>
            <div className="manga-de-var2">
                <p style={{color : theme.darkmode ? "white" : "black", overflow : "hidden",whiteSpace : "nowrap",textOverflow : "ellipsis"}}>{manga.title.en}</p>
            </div>
        </div>   
    );
};

export default MangaVar2;
