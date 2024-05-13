import Header from '../components/shared/Header/Header';
import SearchResult from '../components/searchResults/SearchResult';

export const SearchPhotos = () => {

    return (
        <>
            <Header currentPage={0} setPage={()=>{}} />
            <SearchResult />
        </>
    )
}