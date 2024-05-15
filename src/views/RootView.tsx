import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer/Footer";
import { SearchContext } from "../helpers/SearchContext";


export const RootView = () => {
    return (
        <SearchContext.Provider value={false}>
            <Outlet />
            <Footer />
        </SearchContext.Provider>
    )
}