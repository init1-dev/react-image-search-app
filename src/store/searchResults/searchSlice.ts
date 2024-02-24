import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getRandomSearchThunk, getSearchThunk } from './searchThunk';

interface Image {
  id: string;
  urls: {
      regular: string;
      thumb: string;
  };
  alt_description: string;
  user: {
      username: string;
      name: string;
      profile_image: {
          small: string;
          medium: string;
          large: string;
      };
  };
}

interface SearchState {
    images: Image[];
    query: string;
    loading: boolean;
    status: string;
    error: string | null;
}

const DEFAULT_STATE: SearchState = {
  // images: data.results,
  images: [],
  query: '',
  loading: false,
  status: 'ready',
  error: null,
};

const initialState: SearchState = (() => {
  const persistedState = localStorage.getItem("__image__app__state__");
  return (persistedState) ? JSON.parse(persistedState).search : DEFAULT_STATE;
})();

// const savedImages = localStorage.getItem('savedImages');
// const savedInitialState = (savedImages)
//     ? JSON.parse(savedImages)
//     : { photos: [], term: '' }

// Slice asíncrono para la búsqueda
export const searchSlice = createSlice({
    name: 'search',
    initialState,
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
            .addCase(getSearchThunk.fulfilled, (search, action: PayloadAction<Image[]>) => {
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
// export const savedSlice = createSlice({
//     name: 'saved',
//     initialState: savedInitialState,
//     reducers: {
//         savePhoto: (state, action) => {
//             if (!state.photos.find(photo => photo.id === action.payload.id)) state.photos.push(action.payload)
//         },
//         deletePhoto: (state, action) => {
//             return  state.photos.filter(photo => photo.id !== action.payload) 
//         },
//         editDescription: (state, action) => {
//             const favouriteToEdit = state.photos.find(photo => photo.id === action.payload.id)
//             favouriteToEdit.description = action.payload.description
//             return state
//         },
//         setSavedTerm: (state, action) => {
//             state.term = action.payload
//             return state
//         },
//         resetSavedTerm: (state) => {
//             state.term = ''
//             return state
//         }
//     }
// });

export const { setTerm, resetTerm, setStatusReady } = searchSlice.actions;
// export const { savePhoto, deletePhoto, editDescription, setSavedTerm, resetSavedTerm } = savedSlice.actions;

export const searchPhotos = (state: { search: SearchState }) =>  state.search.images;
export const searchQuery = (state: { search: SearchState }) =>  state.search.query;
export const searchLoading = (state: { search: SearchState }) =>  state.search.loading;
export const searchStatus = (state: { search: SearchState }) => state.search.status;
export const searchError = (state: { search: SearchState }) =>  state.search.error;