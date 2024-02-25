import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MangaStatus from '../../Components/Manga/MangaStatus';
import { Comments, Follows, Rating, Seen } from '../../SharedUI/Statistics';
import TagsStatus from '../../SharedUI/Statistics/TagsStatus/TagsStatus';
import Img from '../../SharedUI/StyledComponents/Img/Img';
import { cutString } from '../../Utils/cutString';
import { filterSomeAttribute } from '../../Utils/filterAttribute';
import { strToUpper } from '../../Utils/stringToUpperCase';
import styles from './card.module.scss';
import { useSelector } from 'react-redux';

const Card = memo(({ handleMangas = ()=>{}, manga, mangaInfo, statistics, setRefCover, refCoverStyle, refTitleStyle }) => {
    const [status, setStatus] = useState(false);
    const theme = useSelector((state) => state.theme);
    const navigate = useNavigate();
    
    const handleManga = () => {
        navigate(`/manga/${manga.id}`)
    }
    
    const handleChoice = () => {
        setStatus(!status);
        handleMangas(manga);
    }

    return (
        <div className={styles.item}>
            {/* <p className={styles.name}>{strToUpper(manga.title)}</p> */}
            <div className={styles.item_content} style={{backgroundColor : theme.darkmode ? "rgb(34,34,34)" : "white"}}>
                <div onClick={handleManga} ref={setRefCover} className={styles.cover + ' ' + refCoverStyle}>
                    <Img 
                        src={`${manga.poster.thumb}`} 
                        alt='' 
                    />
                </div>
                <div className={styles.description}>
                    <div className={styles.title + ' ' + refTitleStyle}>
                        <div onClick={handleManga} className={styles.manganame} style={{color : theme.darkmode ? "white" : "black"}}>{manga.title.en}</div>
                        <div className={styles.statistics}>
                            <>
                                  <Rating rating={manga.rating} />
                                  <Follows follows={manga.follows} />
                                  <Seen seen={manga.views}/>
                                  {/* <Comments statistic={[]} /> */}
                                  </>
                            
                            <MangaStatus 
                                status={manga.status} 
                                styles={{textStyles: { fontSize: '10px' }}}
                            />
                        </div>
                    </div>
                        <div>
                            <TagsStatus 
                            
                                tags={manga.genre} 
                                amount={20}
                                customStyles={{backgroundColor: 'white'}}
                            />
                    </div>
                    <div className={styles.main_title} style={{color : theme.darkmode ? "white" : "black", fontSize : "14px"}}>
                        {
                            cutString(manga.description.en, 450)
                        }
                    </div>
                </div>
            </div>
            {/* {handleMangas
                ? <div onClick={handleChoice} className={status ? styles.minus : styles.plus}>
                      {status ? '-' : '+' }
                  </div>
                : null
            } */}
        </div>
    );
});

export default Card;