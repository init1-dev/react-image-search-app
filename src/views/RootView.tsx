import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer/Footer";
import { SearchContext } from "../context/SearchContext";


export const RootView = () => {
    return (
        <SearchContext.Provider value={false}>
            <Outlet />
            <Footer />
        </SearchContext.Provider>
    )
}