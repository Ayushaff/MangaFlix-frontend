import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import styles from './chapters.module.scss';
import Volume from './Volume';
import Pagination from '../Pagination/Pagination';
import Spinner from '../../SharedUI/LoadComponents/Spiner/Spinner';

// Import necessary Redux dependencies
import { useDispatch, useSelector } from 'react-redux';
import { fetchMangaFeed } from '../../Store/Slices/mangaSlice';
import Chapters from './Chapters';

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
        // Fetch manga feed data using Axios
        axios.get('http://51.161.35.231:8959/v1/chapter/fa470801-c787-485e-a3c8-49ce224b2d9f')
            .then(response => {
                // Update local state with fetched manga feed data
                setMangaFeed({ load: { status: 'resolved' }, data: response.data.content.data });
                // console.log(response.data.content.data[0]);
                setPages(Math.ceil(response.data.content.data[0].pages.server1.length / step));
            })
            .catch(error => {
                console.error('Error fetching manga feed:', error);
                // Update local state with error status
                setMangaFeed({ load: { status: 'error', error: error }, data: null });
            });
    }, []);

    useEffect(() => {
        dispatch(fetchMangaFeed({ mangaId, offset }));
    }, [currPage, dispatch]);

    return (
        <>
            {mangaFeed.load.status === 'loading' || mangaFeed.load.status === '' ? (
                <Spinner customStyle={{ width: '50px', height: '50px' }} />
            ) : mangaFeed.load.status === 'error' ? (
                <div>Error fetching manga feed: {mangaFeed.load.error.message}</div>
            ) : (
                <div className={styles.volume_item}>
                    <div className={styles.volume_title}>
                        <p
                            style={{
                                color: "#0D0D0D",
                                fontSize: 18,
                                fontFamily: "Fira Sans",
                                fontWeight: "500"
                            }}
                        >
                            {mangaFeed.data[0].title}
                        </p>

                        <p
                            style={{
                                color: "#0D0D0D",
                                fontSize: 17,
                                fontFamily: "Fira Sans",
                                fontWeight: "500",
                            }}
                        >
                            Chapter {mangaFeed.data[0].chapterNumber}
                        </p>

                        <p
                            style={{
                                color: "#0D0D0D",
                                fontSize: 17,
                                fontFamily: "Fira Sans",
                                fontWeight: "500",
                            }}
                        >
                            {mangaFeed.data[0].summary}
                        </p>
                    </div>
                    <Chapters volume={mangaFeed} mangaInfo={mangaInfo} />
                </div>
            )}
        </>
    );
};

export default Volumes;
