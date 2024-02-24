import React, { useState, useEffect } from 'react';
import { collectData } from '../../Utils/layoutData';
import Chapter from './Chapter';

const Chapters = ({ mangaFeed, mangaInfo }) => {
    const [chapters, setChapters] = useState([]);

    useEffect(() => {
        if (mangaFeed && mangaFeed.data) {
            setChapters(collectData(mangaFeed.data, 'chapter'));
        }
    }, [mangaFeed]);

    return (
        chapters.map((chapter, index) => (
            <Chapter key={Object.keys(chapter)[0] + index} chapter={chapter} mangaInfo={mangaInfo} />
        ))
    );
};

export default Chapters;
