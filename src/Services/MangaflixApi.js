class MangaflixApi {

    baseUrl = "http://51.161.35.231:8959";

    getAllManga = async ()=>{
        return await fetch (
            `${this.baseUrl}/v1/manga?page=&limit=&search=&filter=`
        ).then((data)=>data.json());
    }

    // getCoverById = async (coverId)=>{
    //     return await fetch (
    //         `${this.baseUrl}/v1/cover/${coverId}`
    //     ).then((data)=>data.json());
    // }
    
}


export default new MangaflixApi();