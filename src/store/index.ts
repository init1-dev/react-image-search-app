import { configureStore, type Middleware } from "@reduxjs/toolkit";

// import searchReducer from "./searchResults/slice";

const persistanceLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
    next(action);
    localStorage.setItem("__saved__search__", JSON.stringify(store.getState()))
}

export const store = configureStore({
    reducer: {

    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(persistanceLocalStorageMiddleware)
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;