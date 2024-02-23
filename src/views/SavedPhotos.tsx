// import { useState } from "react";
// import { loadTheme, toggleTheme } from "../helpers/theme/themeUtils";

import Header from "../components/Header"
import SearchResult from "../components/SearchResult"

export const SavedPhotos = () => {
    // const [theme, setTheme] = useState(loadTheme);

    // const handleToogleTheme = () => {
    //     const newTheme = toggleTheme(theme);
    //     setTheme(newTheme);
    // }

    return (
        <>
            <Header placeholder="Busca entre tus fotos favoritas.." />
            <SearchResult />
        </>
    )
}