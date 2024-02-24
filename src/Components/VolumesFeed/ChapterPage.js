import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ChapterPage.module.scss'; // Import your CSS module for styling

const ChapterPage = ({ mangaFeed }) => {
    console.log('Manga Feed:', mangaFeed);
    const [pages, setPages] = useState([]);
    const chapterId = mangaFeed?.data[0]?.chapterId; // Extract chapterId from mangaFeed
    console.log('Chapter ID:', chapterId);
    useEffect(() => {
        if (chapterId) {
            axios.get(`http://51.161.35.231:8959/v1/chapter/${chapterId}`)
                .then(response => {
                    setPages(response.data.content.data.pages.server1);
                })
                .catch(error => {
                    console.error('Error fetching chapter pages:', error);
                });
        }
    }, [chapterId]);

    return (
        <div className={styles.chapter_page}>
            <h2>Chapter Pages</h2>
            <div className={styles.page_container}>
                {pages.map((page, index) => (
                    <img key={index} src={page} alt={`Page ${index + 1}`} className={styles.page_image} />
                ))}
            </div>
        </div>
    );
};

export default ChapterPage;
