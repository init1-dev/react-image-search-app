import { createAsyncThunk } from "@reduxjs/toolkit";

import { data } from "../../data";

// const searchUrl = 'https://api.unsplash.com/search/photos?';
const randomUrl = 'https://api.unsplash.com/photos/random?';
const accessKey = '2id9a7MZhL9MgUyiCB9BYB2Je3d0hSOYpdbFz0zEXRQ';
const resultsPerPage = 'per_page=15';

export const getSearchThunk = createAsyncThunk('search/fetchPhotos', async(query: string) => {
    console.log(query);
    
    // const fetchUrl = `${searchUrl}client_id=${accessKey}&${resultsPerPage}&query=${query}`;
        
    // try{
    //     console.log(fetchUrl);
        
    //     const resp = await fetch(fetchUrl)

    //     if (!resp.ok) {
    //         throw new Error(`Error status ${resp.status}`);
    //     }

    //     const data = await resp.json();

    //     return data.results;
    // } 
    // catch (err) {
    //     throw new Error(`Error: ${err}`);
    // }
    return data.results;
})

export const getRandomSearchThunk = createAsyncThunk('search/fetchRandomPhoto', async() => {
    try {
        const fetchUrl = `${randomUrl}client_id=${accessKey}&${resultsPerPage}`;

        const resp = await fetch(fetchUrl)
        
        if (!resp.ok) {
            throw new Error(`Error status ${resp.status}`);
        }

        const data = await resp.json();
        
        return [data];
    } 
    catch(err) {
        throw new Error(`Error: ${err}`);
    }
})