import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import styles from './chapters.module.scss';
import Pagination from '../Pagination/Pagination';
import Spinner from '../../SharedUI/LoadComponents/Spiner/Spinner';

// Import necessary Redux dependencies
import { useDispatch } from 'react-redux';
import { fetchMangaFeed } from '../../Store/Slices/mangaSlice';
import Chapters from './Chapters';
import ChapterItem from './ChapterItem'; // Import the new component

const step = 96;

const Volumes = ({ mangaId, mangaInfo }) => {
    const [pages, setPages] = useState(1);
    const [currPage, setCurrPage] = useState(1);
    const [offset, setOffset] = useState(0);
    const dispatch = useDispatch();
    // Use local state to store manga feed data
    const [mangaFeed, setMangaFeed] = useState({
        load: { status: 'loading' },
        data: null,
    });
    useEffect(() => {
        if (mangaFeed) {
            console.log('Manga feed data:', mangaFeed);
            if (mangaFeed.load.status === 'resolved') {
                setPages(Math.ceil(mangaFeed?.data?.total / step));
            }
        }
    }, [mangaFeed]);

    useEffect(() => {
        axios.get(`http://51.161.35.231:8959/v1/chapter/mangaId/${mangaId}`)
            .then(response => {
                setMangaFeed({ load: { status: 'resolved' }, data: response.data.content.data });
                setPages(Math.ceil(response.data.content.data[0].pages.server1.length / step));
            })
            .catch(error => {
                console.error('Error fetching manga feed:', error);
                setMangaFeed({ load: { status: 'error', error: error }, data: null });
            });
    }, []);

    useEffect(() => {
        dispatch(fetchMangaFeed({ mangaId, offset }));
    }, [currPage, dispatch]);

    return (
        <>
            {mangaFeed.load.status === 'loading' && (
                <Spinner customStyle={{ width: '50px', height: '50px' ,color: 'red'}} />
            )}
    
            {mangaFeed.load.status === 'error' ? (
                <div>
                    <h1 style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px', color: 'red', fontWeight: 'bold', fontSize: '20px', fontFamily: 'montserrat' }}>Coming soon</h1>
                </div>
            ) : (
                <div className={styles.chapters}>
                    <div className={styles.controls_block}>
                        <input className="reg-button" type="button" value="Descending" />
                        <input className="reg-button" type="button" value="Collapse" />
                    </div>
                    <div className={styles.content_block}>
    
                        {console.log('Manga feed from content block:', mangaFeed)}
                        {mangaFeed && mangaFeed.data && mangaFeed.data.map((chapter, index) => (
                            <ChapterItem
                                key={index}
                                chapter={chapter}
                                mangaId={mangaId}
                                mangaFeedStatus={mangaFeed.load.status} // Pass mangaFeedStatus prop
                            />
                        ))}
    
                        <Chapters volume={mangaFeed} mangaInfo={mangaInfo} />
    
                    </div>
                </div>
            )}
        </>
    );
    
};

export default Volumes;
