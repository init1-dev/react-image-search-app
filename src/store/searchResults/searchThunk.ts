import { createAsyncThunk } from "@reduxjs/toolkit";

const searchUrl = 'https://api.unsplash.com/search/photos?';
const randomUrl = 'https://api.unsplash.com/photos/random?';
const accessKey = import.meta.env.VITE_API_KEY;
const resultsPerPage = 15;
const randomCount = 15;

export const getSearchThunk = createAsyncThunk('search/fetchPhotos', async(query: string) => {
    const fetchUrl = `${searchUrl}client_id=${accessKey}&per_page=${resultsPerPage}&query=${query}`;
    
    try{
        const resp = await fetch(fetchUrl)

        if (!resp.ok) {
            throw new Error(`Error status ${resp.status}`);
        }

        const data = await resp.json();

        return data.results;
    } 
    catch (err) {
        throw new Error(`Error: ${err}`);
    }
})

export const getRandomSearchThunk = createAsyncThunk('search/fetchRandomPhoto', async() => {
    try {
        const fetchUrl = `${randomUrl}client_id=${accessKey}&count=${randomCount}`;

        const resp = await fetch(fetchUrl)
        
        if (!resp.ok) {
            throw new Error(`Error status ${resp.status}`);
        }

        const data = await resp.json();
        
        return data;
    } 
    catch(err) {
        throw new Error(`Error: ${err}`);
    }
})