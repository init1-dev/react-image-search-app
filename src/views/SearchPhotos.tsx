import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from "../hooks/store";
import { searchQuery } from '../store/searchResults/searchSlice';
import { getSearchThunk } from '../store/searchResults/searchThunk';
import Header from '../components/Header';
import SearchResult from '../components/SearchResult';

export const SearchPhotos = () => {
    const dispatch = useAppDispatch();
    const query = useAppSelector(searchQuery);

    useEffect(() => {
        if(query !== ''){
          dispatch(getSearchThunk(query));
        }
      }, [dispatch, query]);

    return (
        <>
            <Header placeholder="Introduce un término para buscar.." />
            <SearchResult />
        </>
    )
}