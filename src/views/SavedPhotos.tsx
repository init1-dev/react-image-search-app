import { useLocation } from "react-router-dom";
import Header from "../components/shared/Header/Header"
import SavedResults from "../components/savedResults/SavedResults";
import { getPageFromUrl } from "../helpers/pageFunctions";
import { useState } from "react";
import { SearchContext } from "../helpers/SearchContext";

export const SavedPhotos = () => {
    const currentPath = useLocation();
    const pageUrl = getPageFromUrl(currentPath.search);

    const [page, setPage] = useState(pageUrl);

    return (
        <SearchContext.Provider value={true}>
            <Header currentPage={page} setPage={setPage} />
            <SavedResults currentPage={page} setPage={setPage}></SavedResults>
        </SearchContext.Provider>
    )
}