import Header from '../components/Header';
import SearchResult from '../components/SearchResult';

export const SearchPhotos = () => {

    return (
        <>
            <Header placeholder="Introduce un término para buscar.." />
            <SearchResult />
        </>
    )
}