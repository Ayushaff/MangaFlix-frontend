import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import styles from './chapters.module.scss';

const ChapterItem = ({ chapter, mangaId, chapterId }) => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleClick = () => {
        navigate(`/chapter/${chapterId}`); // Navigate to ChapterPage with chapterId
    };

    return (
        <div className={styles.chapter_item}>
            <div className={styles.chapter_link} onClick={handleClick}> {/* Use onClick to trigger navigation */}
                <div className={styles.chapter_info}>
                    <h3 className={styles.chapter_title}>{chapter.title}</h3>
                    <p className={styles.chapter_number}>Chapter {chapter.chapterNumber}</p>
                    <p className={styles.chapter_summary}>{chapter.summary}</p>
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
        </div>
    );
};

export default ChapterItem;
