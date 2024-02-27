import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import styles from './chapters.module.scss';
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
    const [searchQuery, setSearchQuery] = useState('');
    const [sortingOrder, setSortingOrder] = useState('ascending'); // State to track sorting order
    const [mangaFeed, setMangaFeed] = useState({
        load: { status: 'loading' },
        data: null,
    });
    const [latestChapter, setLatestChapter] = useState(null); // State to store latest chapter
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false); // State to track loading while searching

    useEffect(() => {
        axios.get(`http://51.161.35.231:8959/v1/chapter/mangaId/${mangaId}`)
            .then(response => {
                setMangaFeed({ load: { status: 'resolved' }, data: response.data.content.data });
                setPages(Math.ceil(response.data.content.data[0].pages.server1.length / step));
                setLatestChapter(response.data.content.data[response.data.content.data.length - 1]); // Set latest chapter
            })
            .catch(error => {
                console.error('Error fetching manga feed:', error);
                setMangaFeed({ load: { status: 'error', error: error }, data: null });
            });
    }, []);

    useEffect(() => {
        if (mangaFeed) {
            if (mangaFeed.load.status === 'resolved') {
                setPages(Math.ceil(mangaFeed?.data?.total / step));
            }
        }
    }, [mangaFeed]);

    useEffect(() => {
        dispatch(fetchMangaFeed({ mangaId, offset }));
    }, [currPage, dispatch]);

    // Function to handle search input change
    const handleSearchInputChange = async (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        setLoading(true); // Set loading to true while searching
        try {
            // Simulate API request delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            setLoading(false); // Set loading to false after search operation
        } catch (error) {
            console.error('Error searching:', error);
            setLoading(false); // Set loading to false in case of error
        }
    };

    // Function to toggle sorting order
    const toggleSortingOrder = () => {
        setSortingOrder(prevOrder => prevOrder === 'ascending' ? 'descending' : 'ascending');
    };

    // Function to sort chapters based on sorting order
    const sortedChapters = mangaFeed.data && mangaFeed.data.slice().sort((a, b) => {
        if (sortingOrder === 'ascending') {
            return a.chapterNumber - b.chapterNumber;
        } else {
            return b.chapterNumber - a.chapterNumber;
        }
    });

    // Function to filter chapters based on search query
    const filteredChapters = mangaFeed.data && mangaFeed.data.filter(chapter =>
        chapter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chapter.chapterNumber.toString().includes(searchQuery) // Include chapter number in the search
    );

    return (
        <>
            {mangaFeed.load.status === 'loading' && (
                <Spinner customStyle={{ width: '50px', height: '50px', color: 'red' }} />
            )}

            {mangaFeed.load.status === 'error' ? (
                <div>
                    <h1 style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px', color: 'red', fontWeight: 'bold', fontSize: '20px', fontFamily: 'montserrat' }}>Coming soon</h1>
                </div>
            ) : (
                <div className={styles.chapters}>
                    <div className={styles.controls_block}>
                        <button className="reg-button" onClick={toggleSortingOrder}>
                            {sortingOrder === 'ascending' ? 'Descending' : 'Ascending'}
                        </button>
                        <input className="reg-button" type="button" value="Collapse" />
                    </div>

                    <div className={styles.latest_chapter}>
                        <p>Latest Chapter: {latestChapter ? latestChapter.title : "No chapters available"}</p>
                    </div>
                    <div style={{ width: '100%', height: '1px', backgroundColor: 'black', marginTop: '10px' }}></div>

                    <div className='chapter-number' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '90px', margin: '20px 0px 10px 10px' }}>
                        <div className='first-chapter' style={{ backgroundColor: '#5C8374', flex: 1, marginRight: '5px', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <p style={{ margin: 0, color: 'white' }}>First Chapter {mangaFeed.data && mangaFeed.data[0].chapterNumber}</p>
                            <p style={{ marginTop: "10px", color: 'white', fontWeight: 'bold', fontSize: '14pt' }}>{mangaFeed.data && mangaFeed.data[0].title} </p>
                        </div>
                        <div className='last-chapter' style={{ backgroundColor: '#5C8374', flex: 1, marginLeft: '5px', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <p style={{ margin: 0, color: 'white' }}>Last Chapter {mangaFeed.data && mangaFeed.data[mangaFeed.data.length - 1].chapterNumber}</p>
                            <p style={{ marginTop: "10px", color: 'white', fontWeight: 'bold', fontSize: '14pt' }}>{mangaFeed.data && mangaFeed.data[mangaFeed.data.length - 1].title} </p>
                        </div>
                    </div>

                    <div className='search-chapter' style={{ backgroundColor: '#BDE4E4', height: '50px', margin: '20px 0px 10px 10px', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'none' }}>
                        <input
                            style={{
                                background: 'transparent',
                                border: 'none',
                                borderRadius: '5px',
                                padding: '10px',
                                fontSize: '16px',
                                width: '100%',
                                outline: 'none', // Remove the default outline
                            }}
                            placeholder="Search Chapter Number or Title"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                        />

                    </div>
                    {/* {loading && <Spinner customStyle={{ width: '20px', height: '20px', marginLeft: '10px' }} />} */}

                    <div className={styles.content_block} style={{ overflowY: 'auto', maxHeight: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
    {/* Render filtered and sorted chapters or show no chapters found message */}
    {/* Check if loading, if true, render spinner */}
    {loading ? (
        <Spinner customStyle={{ width: '50px', height: '50px', color: 'red' }} />
    ) : (
        mangaFeed.data && mangaFeed.data.length > 0 ? (
            mangaFeed.data
                .filter(chapter => chapter.title.toLowerCase().includes(searchQuery.toLowerCase()) || chapter.chapterNumber.toString().includes(searchQuery)) // Include chapter number in the search
                .sort((a, b) => {
                    if (sortingOrder === 'ascending') {
                        return a.chapterNumber - b.chapterNumber;
                    } else {
                        return b.chapterNumber - a.chapterNumber;
                    }
                })
                .reverse() // Reverse the order to display the latest chapters first
                .slice(0, 10) // Limit to the first 10 elements
                .map((chapter, index) => (
                    <ChapterItem
                        key={index}
                        chapter={chapter}
                        mangaId={mangaId}
                        mangaFeedStatus={mangaFeed.load.status} // Pass mangaFeedStatus prop
                    />
                ))
        ) : (
            <p>No chapters found</p>
        )
    )}
</div>


                </div>
            )}
        </>
    );
};

export default Volumes;
