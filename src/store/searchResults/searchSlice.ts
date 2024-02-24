import { createSlice } from '@reduxjs/toolkit';
import { getRandomSearchThunk, getSearchThunk } from './searchThunk';
import { SavedState, SearchState } from '../../helpers/interfaces';

const DEFAULT_STATE: SearchState = {
  // images: data.results,
  images: [],
  query: '',
  loading: false,
  status: 'not_ready',
  error: null,
};

const searchInitialState: SearchState = (() => {
  const persistedState = localStorage.getItem("__image__app__state__");
  return (persistedState) ? JSON.parse(persistedState).search : DEFAULT_STATE;
})();

const savedInitialState: SavedState = (() => {
    const persistedState = localStorage.getItem("__image__app__state__");
    return (persistedState) ? JSON.parse(persistedState).saved : { images: [], query: ''};
})();

// Slice asíncrono para la búsqueda
export const searchSlice = createSlice({
    name: 'search',
    initialState: searchInitialState,
    reducers: {
        setTerm: (search, action) => {
            search.query = action.payload
        },
        resetTerm: (search) => {
            search.query = ''
        },
        setStatusReady: (search) => {
            search.status = 'ready'
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
                search.status = 'rejected'
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
                search.status = 'rejected'
                search.error = action.error?.message ?? "Unknown error occurred";
            })
        }
  });

// Slice síncrono para fotos guardadas
export const savedSlice = createSlice({
    name: 'saved',
    initialState: savedInitialState,
    reducers: {
        savePhoto: (state, action) => {
            if (!state.images.find(image => image.id === action.payload.id)) state.images.push(action.payload)
        },
        deletePhoto: (state, action) => {
            return {
                ...state,
                images: state.images.filter(image => image.id !== action.payload) 
            }
        },
        // editDescription: (state, action) => {
        //     const favouriteToEdit = state.images.find(photo => photo.id === action.payload.id)
        //     favouriteToEdit.description = action.payload.description
        //     return state
        // },
        searchByTerm: (state, action) => {
            console.log(action);
            
            state.query = action.payload
            return state
        },
        resetSearchTerm: (state) => {
            state.query = ''
            return state
        }
    }
});

export const { setTerm, resetTerm, setStatusReady } = searchSlice.actions;
// export const { savePhoto, deletePhoto, editDescription, setSavedTerm, resetSavedTerm } = savedSlice.actions;
export const { savePhoto, deletePhoto, searchByTerm, resetSearchTerm } = savedSlice.actions;

export const searchPhotos = (state: { search: SearchState }) =>  state.search.images;
export const searchQuery = (state: { search: SearchState }) =>  state.search.query;
export const searchLoading = (state: { search: SearchState }) =>  state.search.loading;
export const searchStatus = (state: { search: SearchState }) => state.search.status;
export const searchError = (state: { search: SearchState }) =>  state.search.error;