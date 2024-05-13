import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer/Footer";

export const RootView = () => {
    return (
        <>
            <Outlet />
            <Footer />
        </>
    )
}