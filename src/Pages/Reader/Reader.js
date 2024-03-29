import React, { useEffect, useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setReaderStatus } from "../../Store/Slices/menuSlice";
import { useParams } from "react-router-dom";
import "./reader-page.scss";
import LazyLoad from 'react-lazyload';

import SideMenu from "../../Features/SideMenu/SideMenu";
import SideReader from "./SideReader/SideReader";
import Spinner from "../../SharedUI/LoadComponents/Spiner/Spinner";

import MangaDexApi from "../../Services/MangaDexApi";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const Read = () => {
  const [serverData, setServerData] = useState([]);
  const params = useParams();
  const isInitialMount = useRef(true);
  const mangaId = params["*"];
  const chapterId = params["*"];
  const clientHeight = document.documentElement.clientHeight - 20;
  const clientWidth = document.documentElement.clientWidth;

  const [pageNumber, setPageNumber] = useState(1);
  const [mangaVolumes, setMangaVolumes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mangaTitle, setMangaTitle] = useState("");
  const [chapterTitle, setChapterTitle] = useState("");
  const [currentChapter, setCurrentChapter] = useState({
    volume: 1,
    chapter: 1,
    counter: 1,
    currImg: 1,
    maxImg: 1,
  });
  const [images, setImages] = useState([]);

  const [mangaFeedData, setMangaFeedData] = useState(null);
  const [currentVolume, setCurrentVolume] = useState(1);
  const [currentChapterNum, setCurrentChapterNum] = useState(1);
  const [selectedServer, setSelectedServer] = useState('Server-01'); // State to track the selected server

  // Handler function for server selection change

  const dispatch = useDispatch();
  const menu = useSelector((store) => store.menu.readerMenu);
  const handleImageTap = () => {
    // Check if there's a next image to display
    if (currentImageIndex < mangaFeedData?.content?.data?.pages?.server1?.length - 1) {
      setCurrentImageIndex(prevIndex => prevIndex + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://51.161.35.231:8959/v1/chapter/${chapterId}`);
        console.log("ch", chapterId);
        setTotalPages(response.data?.content?.data?.pages?.server1?.length || 0); // Set total pages here
        setMangaFeedData(response.data);
        setServerData(response.data?.content?.data?.pages?.server1 || []);
        setVolumeAndChapterInfo(response.data);
        console.log("nmaf", mangaFeedData?.content?.data?.pages?.server1);
      } catch (error) {
        console.error("Error fetching manga feed:", error);
      }
    };

    fetchData();
  }, [chapterId]);


  const setVolumeAndChapterInfo = (data) => {
    // Extract volume and chapter information from data and set the state
    const volume = data?.content?.data?.volume || 1; // Default to 1 if volume is not provided
    const chapter = data?.content?.data?.chapterNumber || 1; // Default to 1 if chapter is not provided
    setCurrentVolume(volume);
    setCurrentChapterNum(chapter);
  };


  useEffect(() => {
    (async () => {
      const mangaName = await MangaDexApi.getMangaInfo(mangaId).then((data) =>
        data.json()
      );
      setMangaTitle(
        mangaName?.data?.attributes?.title?.en ||
        mangaName?.data?.attributes?.title?.["ja-ro"]
      );
    })();
  }, []);

  const fetchChapterHash = async (volume, chapter, counter) => {
    const chaptersNames = Object.keys(mangaVolumes[volume]?.chapters);
    const currChapter = +chaptersNames[+counter];

    const chaptersIds = [
      ...mangaVolumes[volume]?.chapters[currChapter]?.others,
      mangaVolumes[volume]?.chapters[currChapter]?.id,
    ];

    const chaterInfoArr = await MangaDexApi.getInfoAboutChapter(chaptersIds);

    const findChapterByLang = (chapters, lang) => {
      for (let i = 0; i < lang.length; i++) {
        const chapterId = chapters.findIndex(
          (el) => el?.data?.attributes?.translatedLanguage === lang[i]
        );
        if (chapterId !== -1) {
          return chapterId;
        }
      }
    };

    let chapterLangId = findChapterByLang(chaterInfoArr, ["en", "uk", "ru"]);

    const chapterId =
      chapterLangId === chaptersIds.length - 1
        ? chaptersIds[chaptersIds.length - 1]
        : chaptersIds[chapterLangId];

    // const chapterHash = await MangaDexApi.getChapterHash(chapterId);
    // const chapterName = await MangaDexApi.getInfoAboutChapter([chapterId]);

    // setChapterTitle(chapterName[0]?.data?.attributes?.title);

    // const images = chapterHash?.chapter?.data?.map(
    //   (el) => `${chapterHash?.baseUrl}/data/${chapterHash?.chapter?.hash}/${el}`
    // );

    setImages(images);

    setCurrentChapter((currentChapter) => ({
      ...currentChapter,
      currImg: 1,
      maxImg: images?.length || 1,
    }));
  };

  useEffect(() => {
    const header = document.querySelector(".header-block");

    if (menu.status) {
      header.style.position = "sticky";
    } else {
      header.style.position = "relative";
    }
    return () => {
      header.style.position = "sticky";
    };
  }, [menu]);

  useEffect(() => {
    const fetchVolumes = async () => {
      const volumes = await MangaDexApi.getMangaChapters(mangaId);

      if (!volumes?.volumes || Object.keys(volumes?.volumes).length === 0) {
        const someOtherIds = (await MangaDexApi.getMangaInfo(mangaId))?.data
          ?.relationships;
        const newMangaId =
          someOtherIds[
            someOtherIds?.findIndex((el) => el?.related === "colored")
          ]?.id;
        const volumes = await MangaDexApi.getMangaChapters(newMangaId);
        setMangaVolumes(volumes?.volumes);
      } else {
        setMangaVolumes(volumes?.volumes);
      }
    };
    fetchVolumes();
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      fetchChapterHash(
        currentChapter.volume,
        currentChapter.chapter,
        currentChapter.counter
      );
    }
  }, [currentChapter.volume, currentChapter.chapter, mangaVolumes]);

  const mangaContentDelegate = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const leftBorder = rect.left + (rect.width / 3); // Left third of the element
    const rightBorder = rect.left + (2 * rect.width / 3); // Right two-thirds of the element
    if (e.pageX < leftBorder) {
      console.log("prev");
      handlePrevImage(); // Go to previous image
    } else if (e.pageX > rightBorder) {
      console.log("righ");

      handleNextImage(); // Go to next image (optional)
    }
  };



  const handleNextPage = () => {
    if (currentChapter.currImg < mangaFeedData.content.data.pages.server1.length) {
      setCurrentChapter((prevState) => ({
        ...prevState,
        currImg: prevState.currImg + 1,
      }));
    }

  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
      setPageNumber(currentImageIndex);
    } else {
      // Optionally, handle the case when the current image is already the first image
      // For example, you can loop back to the last image or display a message
      // setCurrentImageIndex(mangaFeedData?.content?.data?.pages?.server1?.length - 1);
    }
  };

  const handleNextImage = () => {
    if (currentImageIndex < mangaFeedData?.content?.data?.pages?.server1?.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
      setPageNumber(currentImageIndex + 2);
    } else {
      setCurrentImageIndex(0);
      setPageNumber(1);
    }
  };


  const handleNextImg = () => {
    document.documentElement.scrollTop = document.documentElement.scrollHeight;

    if (
      currentChapter.currImg === currentChapter.maxImg &&
      currentChapter.counter + 1 <=
      Object.keys(mangaVolumes[currentChapter.volume]?.chapters).length - 1
    ) {
      setCurrentChapter((currentChapter) => ({
        ...currentChapter,
        chapter: currentChapter.chapter + 1,
        counter: currentChapter.counter + 1,
        currImg: 1,
        maxImg: 1,
      }));
      setImages([]);
    } else if (
      currentChapter.currImg === currentChapter.maxImg &&
      currentChapter.counter + 1 >
      Object.keys(mangaVolumes[currentChapter.volume]?.chapters).length - 1
    ) {
      setCurrentChapter((currentChapter) => ({
        volume: currentChapter.volume + 1,
        chapter: currentChapter.chapter + 1,
        counter: 1,
        currImg: 1,
        maxImg: 1,
      }));
      setImages([]);
    } else {
      setCurrentChapter((currentChapter) => ({
        ...currentChapter,
        currImg: currentChapter.currImg + 1,
      }));
    }
  };

  const handlePrevImg = () => {
    document.documentElement.scrollTop = document.documentElement.scrollHeight;

    if (
      currentChapter.currImg === 1 &&
      currentChapter.volume === 1 &&
      currentChapter.chapter === 1
    ) {
      setCurrentChapter({
        ...currentChapter,
        chapter:
          Object.keys(mangaVolumes[currentChapter.volume]?.chapters).length - 1,
        counter:
          Object.keys(mangaVolumes[currentChapter.volume]?.chapters).length - 1,
        currImg: 1,
        maxImg: 1,
      });
      setImages([]);
    } else if (
      currentChapter.currImg === 1 &&
      currentChapter.volume !== 1 &&
      currentChapter.counter - 1 === 0
    ) {
      setCurrentChapter({
        ...currentChapter,
        volume: currentChapter.volume - 1,
        chapter: currentChapter.chapter - 1,
        counter:
          Object.keys(mangaVolumes[currentChapter.volume - 1]?.chapters)
            .length - 1,
        currImg: 1,
        maxImg: 1,
      });
      setImages([]);
    } else if (currentChapter.currImg === 1 && currentChapter.counter !== 1) {
      setCurrentChapter({
        ...currentChapter,
        chapter: currentChapter.chapter - 1,
        counter: currentChapter.counter - 1,
        currImg: 1,
        maxImg: 1,
      });
      setImages([]);
    } else {
      setCurrentChapter({
        ...currentChapter,
        currImg: currentChapter.currImg - 1,
      });
    }
  };

  const handleMenu = () => {
    dispatch(setReaderStatus(!menu.status));
  };

  const handleChapter = (volume, chapter, counter) => {
    setCurrentChapter({
      volume: +volume,
      chapter: +chapter,
      counter: +counter,
      currImg: 1,
      maxImg: 1,
    });
    setImages([]);
  };

  const handleImage = (image) => {
    setCurrentChapter({
      ...currentChapter,
      currImg: image,
    });
  };

  const observer = useRef(null);
  const lastImageRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        handleNextPage();
      }
    });
    if (node) observer.current.observe(node);
  }, []);
  // Define constants for number of pages per page
  const pagesPerPage = 1; // Adjust this value as needed

  // Calculate starting and ending indices for the current page
  const startIndex = (currentPage - 1) * pagesPerPage;
  const endIndex = Math.min(startIndex + pagesPerPage, mangaFeedData?.content?.data?.pages?.server1?.length);

  function handleServerChange(server) {
    setSelectedServer(server);
    // Set the server data based on the selected server
    if (server === 'Server-01') {
      setServerData(mangaFeedData?.content?.data?.pages?.server1 || []);
    } else if (server === 'Server-02') {
      setServerData(mangaFeedData?.content?.data?.pages?.server2 || []);
    }
  }
  return (<>
    <main className="chapter-page">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{chapterTitle || ""}</title>
        <meta
          name="description"
          content={`MangaDex ${mangaTitle || ""} chapter ${chapterTitle || ""}`}
        />
      </Helmet>
      <div className="chapter-title">
        <div className="chapter-description" style={{ textAlign: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              style={{
                marginRight: "10px",
                marginBottom: "5px",
                width: "20px",
                height: "20px",
              }}
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="14"
              viewBox="0 0 448 512"
            >
              <path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
            </svg>
            <p className="chapter-name">{mangaFeedData?.content?.data?.title}</p>
          </div>
          <p className="manga-name">{mangaTitle}</p>
        </div>

        <div className="read-progress-info">
          <div className="c-server">
            <select
              className="select-menu"
              value={selectedServer}
              onChange={(e) => handleServerChange(e.target.value)}
            >
              <option value="Server-01">Server-01</option>
              <option value="Server-02">Server-02</option>
            </select>
          </div>


          <div className="c-vol">
            {" "}
            <p>
              {" "}
              {`Vol. ${mangaFeedData?.content?.data?.volume}
                        Ch. ${mangaFeedData?.content?.data?.chapterNumber}`}
            </p>
          </div>
          <div className="c-pg">
            {" "}
            <p> {`Pg . ${pageNumber}/${totalPages}`}</p>
          </div>
          <div className="c-menu" onClick={handleMenu}>
            <p>Menu</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="17"
              width="16"
              viewBox="0 0 448 512"
              fill="white"
            >
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="chapter-content" style={{ display: "flex", flexDirection: "column" }} onClick={mangaContentDelegate}>
        {console.log("asd", mangaFeedData?.load?.status)}
        {console.log("serverdata", serverData)}
        {serverData?.load?.status === 'loading' ? (
          <Spinner customStyle={{ width: '450px', height: '50px' }} />
        ) : (
          serverData?.map((imageUrl, idx) => (
            <div key={idx} style={{ position: "relative" }}>
              {idx === currentImageIndex && ( // Only render the image if it matches the currentImageIndex
                <LazyLoad height={200} offset={100}>
                  <img
                    referrerPolicy="no-referrer"
                    src={imageUrl}
                    style={{
                      maxHeight: clientHeight,
                      maxWidth: clientWidth - 40,
                    }}
                    alt={`img-${idx}`}
                  />
                  <p style={{ display: "block", textAlign: "center" }}>{idx + 1}/{serverData?.length}</p>
                  <button className="left-button" onClick={handlePrevImage}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                  <button className="right-button" onClick={handleNextImage}>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </LazyLoad>
              )}


            </div>
          ))
        )}
      </div>






      {/* {images && images.length > 0 ? (
          images?.map((el, idx) => {
            if (idx + 1 === currentChapter.currImg) {
              return (
                <img
                  referrerPolicy="no-referrer"
                  src={el}
                  style={{
                    display: "",
                    maxHeight: clientHeight,
                    maxWidth: clientWidth - 40,
                  }}
                  key={el}
                  alt={`img-${idx}`}
                />
              );
            } else {
              return (
                <img
                  referrerPolicy="no-referrer"
                  src={el}
                  style={{
                    display: "none",
                    maxHeight: clientHeight,
                    maxWidth: clientWidth - 40,
                  }}
                  key={el}
                  alt={`img-${idx}`}
                />
              );
            }
          })
        ) : (
          <div style={{ height: "55vh" }}>
            <Spinner
              customStyle={{
                width: "47px",
                height: "47px",
                borderColor: "red",
              }}
            />
          </div>
        )} */}
      <SideMenu options={{ menuType: "reader" }}>
        <SideReader
          data={mangaVolumes}
          handleChapter={handleChapter}
          currentChapter={currentChapter}
          mangaTitle={mangaTitle}
          currImg={currentChapter.currImg}
          maxImg={currentChapter.maxImg}
          serverData={serverData}
          handleImage={handleImage}
        />
      </SideMenu>
    </main >
  </>
  );
};

export default Read;
