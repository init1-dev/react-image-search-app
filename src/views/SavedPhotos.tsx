import { useLocation } from "react-router-dom";
import Header from "../components/Header"
import SavedResults from "../components/SavedResults"
import { getPageFromUrl } from "../helpers/pageFunctions";
import { useState } from "react";

export const SavedPhotos = () => {
    const currentPath = useLocation();
    const pageUrl = getPageFromUrl(currentPath.search);

    const [page, setPage] = useState(pageUrl);

    return (
        <>
            <Header currentPage={page} setPage={setPage} />
            <SavedResults currentPage={page} setPage={setPage}></SavedResults>
        </>
    )
}