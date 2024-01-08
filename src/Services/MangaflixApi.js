class MangaflixApi {

    baseUrl = "http://localhost:3000";

    getAllManga = async ()=>{
        return await fetch (
            `${this.baseUrl}/v1/manga`
        ).then((data)=>data.json());
    }
    
}


export default new MangaflixApi();