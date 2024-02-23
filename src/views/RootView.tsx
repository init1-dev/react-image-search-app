import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export const RootView = () => {
    return (
        <>
            <Outlet />
            <Footer />
        </>
    )
}