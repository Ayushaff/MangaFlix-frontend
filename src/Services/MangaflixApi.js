import axios from "axios";
class MangaflixApi {
    CorsProxy = 'https://web-production-3f96.up.railway.app/';
    baseUrl = `http://51.161.35.231:8959`;

    getAllManga = async (page="",limit="",search="") => {
        try {
            const authToken = localStorage.getItem("auth-token");
            const response = await axios.get(
                `http://51.161.35.231:8959/v1/manga?page=${page}&limit=${limit}&search=${search}`,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "x-auth-token": authToken,
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch manga', { cause: error });
        }
    }
    getCoverById=async(mangaId)=>{
        try{
            const authToken = localStorage.getItem("auth-token");

            const response=await axios.get(`http://51.161.35.231:8959/v1/manga/${mangaId}`,
            console.log(`response mangaById id: ${mangaId}`,response.data),
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "x-auth-token": authToken,
                },
            }
            );
            

        }catch(error){
            throw new Error("failed to fetch managa ",error);
        }
    }
    getAllGenre = async (page="",limit="",search="") => {
        try {
            const authToken = localStorage.getItem("auth-token");
            const response = await axios.get(
                `${this.baseUrl}/v1/genre?page=${page}&limit=${limit}&search=${search}`,
                {
                    headers: {
                        "x-auth-token": authToken,
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw new Error("failed to fetch genre ",error);
        }
    }
    // getCoverById = async (coverId)=>{`
    //     return await fetch (
    //         `${this.baseUrl}/v1/cover/${coverId}`
    //     ).then((data)=>data.json());
    // }
    
}


export default new MangaflixApi();