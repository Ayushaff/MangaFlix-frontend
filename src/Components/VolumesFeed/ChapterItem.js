import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import styles from './chapters.module.scss';

const ChapterItem = ({ chapter, mangaId }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/chapter/${chapter.chapterId}`);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };
    return (
        <>

            <div className={styles.chapter_item} style={{ overflowY: 'auto', maxHeight: '400px' }}>
                <div className={styles.chapter_link} onClick={handleClick}>
                    <div className={styles.chapter_info}>
                        <h3 className={styles.chapter_title}>{chapter.title}</h3>
                        <p className={styles.chapter_number} style={{fontWeight: 'bold'}}>Chapter {chapter.chapterNumber}</p>
                        <p className={styles.chapter_number} style={{fontSize: '15px'}}>{formatDate(chapter.createdAt)}</p>
                    </div>
                </div>
                {/* Uncomment the following code if you want to render chapter images */}
                {/* <div className={styles.chapter_images}>
                {
                    chapter.pages.server1.map((page, pageIndex) => (
                        <img key={pageIndex} src={page} alt={`Page ${pageIndex + 1}`} />
                    ))
                }
            </div> */}
            </div >
        </>
    );
};

export default ChapterItem;
