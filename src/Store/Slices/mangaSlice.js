import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MangaDexApi from "../../Services/MangaDexApi";
import { collectData } from "../../Utils/layoutData";

import axios from 'axios'; // Import Axios library

export const fetchMangaInfo = createAsyncThunk(
    'manga/fetchMangaInfo',
    async function({ mangaId }, { rejectWithValue, dispatch }) {
        try {
			const authToken = localStorage.getItem("auth-token");

            const response = await axios.get(`http://51.161.35.231:8959/v1/manga/${mangaId}`,
            {
                headers: {
                    "content-type": "application/json",
                    "x-auth-token": authToken,                   
                }
            });

            if (response.status !== 200) {
                throw new Error('Something went wrong...');
            }

            const data = response.data;

            dispatch(setMangaInfo(data));

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const fetchMangaStatistics = createAsyncThunk(
    'manga/fetchMangaStatistics',
    async function({ mangaId }, {rejectWithValue, dispatch}) {
        try {
            const response = await MangaDexApi.getMangaStatistics(mangaId);
            if (!response.ok) {
                throw new Error('Something is going wrong...');
            }
            const data = await response.json();
            dispatch(setStatistics(data['statistics']));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const fetchMangaCovers = createAsyncThunk(
    'manga/fetchMangaCovers',
    async function({ mangaId, offset = 0 }, {rejectWithValue, dispatch}) {
        try {
            const response = await MangaDexApi.getMangaCoversByVolumes(mangaId, offset);
            dispatch(setCovers(response));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const fetchMangaFeed = createAsyncThunk(
    'manga/fetchMangaAuthor',
    async function({ mangaId, offset = 0 }, {rejectWithValue, dispatch}) {
        try {
            const response = await MangaDexApi.getMangaFeed(mangaId, offset);
            if (!response.ok) {
                throw new Error('Something is going wrong...');
            }
            const data = await response.json();
            dispatch(setFeed({total: data.total, array: collectData(data.data, 'volume')}));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const initialState = {
    mangaInfo: {
        load: {
            status: 'loading',
            error: null
        },
        data: null
    },
    statistics: {
        load: {
            status: 'loading',
            error: null
        },
        data: null
    },
    feed: {
        load: {
            status: 'loading',
            error: null
        },
        data: null
    },
    covers: {
        load: {
            status: 'loading',
            error: null
        },
        data: null
    }
}

const setLoading = (state, action, selector) => {
    state[selector].load.status = 'loading';
    state[selector].load.error = null;
}

const setResolved = (state, action, selector) => {
    state[selector].load.status = 'resolved';
    state[selector].load.error = null;
}

const setError = (state, action, selector) => {
    state[selector].load.status = 'rejecred';
    state[selector].load.error = action.payload;
}

const mangaSlice = createSlice({
    name: 'manga',
    initialState,
    reducers: {
        setMangaInfo(state, action) {
            state.mangaInfo.data = action.payload;
        },
        setStatistics(state, action) {
            state.statistics.data = action.payload;
        },
        setCovers(state, action) {
            state.covers.data = action.payload;
        },
        setFeed(state, action) {
            state.feed.data = action.payload;
        },
    },
    extraReducers: {
        [fetchMangaInfo.pending]: (state, action) => setLoading(state, action, 'mangaInfo'),
        [fetchMangaInfo.fulfilled]: (state, action) => setResolved(state, action, 'mangaInfo'),
        [fetchMangaInfo.rejected]: (state, action) => setError(state, action, 'mangaInfo'),

        [fetchMangaStatistics.pending]: (state, action) => setLoading(state, action, 'statistics'),
        [fetchMangaStatistics.fulfilled]: (state, action) => setResolved(state, action, 'statistics'),
        [fetchMangaStatistics.rejected]: (state, action) => setError(state, action, 'statistics'),

        [fetchMangaCovers.pending]: (state, action) => setLoading(state, action, 'covers'),
        [fetchMangaCovers.fulfilled]: (state, action) => setResolved(state, action, 'covers'),
        [fetchMangaCovers.rejected]: (state, action) => setError(state, action, 'covers'),

        [fetchMangaFeed.pending]: (state, action) => setLoading(state, action, 'feed'),
        [fetchMangaFeed.fulfilled]: (state, action) => setResolved(state, action, 'feed'),
        [fetchMangaFeed.rejected]: (state, action) => setError(state, action, 'feed')
    }
})

export const { setMangaInfo, setAuthor, setStatistics, setCovers, setFeed } = mangaSlice.actions

export default mangaSlice.reducer;