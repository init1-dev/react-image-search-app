import Header from '../components/Header';
import SearchResult from '../components/SearchResult';

export const SearchPhotos = () => {

    return (
        <>
            <Header currentPage={0} setPage={()=>{}} />
            <SearchResult />
        </>
    )
}