import { createSlice } from '@reduxjs/toolkit';
import { getRandomSearchThunk, getSearchThunk } from './searchThunk';
import { SavedState, SearchState } from '../../helpers/interfaces';
import { updateTags } from '../../helpers/updateTags';
import { createTags } from '../../helpers/createTags';

const DEFAULT_STATE: SearchState = {
    images: [],
    query: '',
    loading: false,
    status: 'not_ready',
    error: null,
};

const SAVED_DEFAULT_STATE: SavedState = {
    images: [],
    tags: [],
    query: '',
    imagesPerPage: 10
};

const searchInitialState: SearchState = (() => {
    const persistedState = localStorage.getItem("__image__app__state__");
    return (persistedState) ? JSON.parse(persistedState).search : DEFAULT_STATE;
})();

const savedInitialState: SavedState = (() => {
    const persistedState = localStorage.getItem("__image__app__state__");
    return (persistedState) ? JSON.parse(persistedState).saved : SAVED_DEFAULT_STATE;
})();

export const searchSlice = createSlice({
    name: 'search',
    initialState: searchInitialState,
    reducers: {
        setTerm: (search, action) => {
            search.query = action.payload;
        },
        resetTerm: (search) => {
            search.query = '';
        },
        setStatusReady: (search) => {
            search.status = 'ready';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSearchThunk.pending, (search) => {
                search.loading = true;
                search.status = 'pending';
                search.error = null;
            })
            .addCase(getSearchThunk.fulfilled, (search, action) => {
                search.loading = false;
                search.status = 'fulfilled';
                search.images = action.payload;
            })
            .addCase(getSearchThunk.rejected, (search, action) => {
                search.loading = false;
                search.status = 'rejected';
                search.error = action.error?.message ?? "Unknown error occurred";
            })
            .addCase(getRandomSearchThunk.pending,(search) => {
                search.loading = true;
                search.status = 'pending';
                search.error = null;
            })
            .addCase(getRandomSearchThunk.fulfilled,(search, action) => {
                search.loading = false;
                search.status = 'fulfilled';
                search.images = action.payload;
            })
            .addCase(getRandomSearchThunk.rejected,(search, action) => {
                search.loading = false;
                search.status = 'rejected';
                search.error = action.error?.message ?? "Unknown error occurred";
            })
        }
});

export const savedSlice = createSlice({
    name: 'saved',
    initialState: savedInitialState,
    reducers: {
        savePhoto: (state, action) => {
            const { id, tags } = action.payload;
            if(!state.images.find(image => image.id === id)){
                const imageTags = tags || [{title: 'random', type: 'search'}];
                state.images.push({...action.payload, tags: imageTags});
            }
            const tagsToCreate = tags || [{title: 'random', type: 'search'}];
            createTags(state, tagsToCreate);
        },
        deletePhoto: (state, action) => {
            const index = state.images.findIndex((image) => image.id === action.payload);
            const imageToDelete = state.images[index];
            const tags = imageToDelete.tags.map(tag => tag.title);

            updateTags(state.tags, tags);
            state.images.splice(index, 1);
        },
        editDescription: (state, action) => {
            const { id, newDescription } = action.payload;
            const savedItem = state.images.find(image => image.id === id);
            if(savedItem) {
                savedItem.description = newDescription;
                return state;
            }
        },
        searchByTerm: (state, action) => {
            state.query = action.payload;
            return state;
        },
        resetSearchTerm: (state) => {
            state.query = '';
            return state;
        },
        clearSaved: (state) => {
            state.images = [];
            state.query = '';
            state.tags = [];
        },
        updateImagesPerPage: (state, action) => {
            state.imagesPerPage = action.payload;
            return state;
        }
    }
});

export const { setTerm, resetTerm, setStatusReady } = searchSlice.actions;
export const { savePhoto, deletePhoto, searchByTerm, resetSearchTerm, editDescription, clearSaved, updateImagesPerPage } = savedSlice.actions;

export const searchPhotos = (state: { search: SearchState }) =>  state.search.images;
export const searchQuery = (state: { search: SearchState }) =>  state.search.query;
export const searchLoading = (state: { search: SearchState }) =>  state.search.loading;
export const searchStatus = (state: { search: SearchState }) => state.search.status;
export const searchError = (state: { search: SearchState }) =>  state.search.error;

export const savedPhotos = (state: { saved: SavedState }) => state.saved.images;
export const savedQuery = (state: { saved: SavedState }) => state.saved.query;
export const imageTags = (state: { saved: SavedState }) => state.saved.tags;
export const stateImagesPerPage = (state: { saved: SavedState }) => state.saved.imagesPerPage;