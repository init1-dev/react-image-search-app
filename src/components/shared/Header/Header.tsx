import { ChangeEvent, FormEvent, useState } from "react";
import { useLocation, useNavigate  } from "react-router-dom";
import { useDispatch } from "react-redux";

import { appName } from "../../../Routes";
import { useTheme } from "../../../hooks/themeHooks";
import { clearSaved, savedQuery, searchByTerm, searchQuery, setStatusReady, setTerm } from "../../../store/searchResults/searchSlice";

import WallpaperOutlinedIcon from '@mui/icons-material/WallpaperOutlined';
import { FaHeart } from "react-icons/fa";
import { SearchResultsProps } from "../../../helpers/interfaces";
import { setPageNavigate } from "../../../helpers/pageFunctions";
import { LuListRestart } from "react-icons/lu";

import SearchComponent from "../../SearchComponent";
import { useAppSelector } from "../../../hooks/store";
import { FormStyle, HeaderStyle, LogoStyle, MenuItemStyle, MenuStyle, SearchBarStyle, ToggleThemeButton, TopBarStyle } from "./HeaderStyles";
import { Tooltip } from "@mui/material";

const Header = ({currentPage, setPage}: SearchResultsProps) => {
    const currentPath = useLocation();
    const query = useAppSelector(currentPath.pathname.includes("saved") ? savedQuery : searchQuery);
    console.log("header query: " + query);
    
    const [searchInput, setSearchInput] = useState('');
    const { theme, handleToggleTheme } = useTheme();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if(currentPath.pathname === appName){
            dispatch(setStatusReady());
            dispatch(setTerm(searchInput.trim()));
        } else {
            dispatch(searchByTerm(searchInput));
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const updatedInput = e.currentTarget.value;
        setSearchInput(updatedInput);

        if(currentPath.pathname !== appName && currentPage !== 1){
            navigate(setPageNavigate(currentPath.pathname, 1));
            setPage(1);
        }
        dispatch(searchByTerm(updatedInput));
    }

    const handleResetApp = () => {
        dispatch(clearSaved());
    }

    const placeholder = (currentPath.pathname === appName)
        ? "Search by term"
        : "Search in your images";

    const location = useLocation();

    return (
        <HeaderStyle>
            <TopBarStyle>

                <SearchBarStyle>
                    <LogoStyle to={appName} className="logo">
                        <Tooltip title="Go to search">
                            <WallpaperOutlinedIcon className={location.pathname === appName ? "logoActive" : ""} />
                        </Tooltip>
                    </LogoStyle>

                    <FormStyle onSubmit={ (e) => handleSearchSubmit(e) }>
                        <SearchComponent 
                            placeholder={query ? "Last search: " + query : placeholder} 
                            handleChange={handleChange} 
                        />
                    </FormStyle>
                </SearchBarStyle>

                <MenuStyle>
                    <li>
                        <MenuItemStyle to={appName + "/saved"}>
                            <Tooltip title="Saved images">
                                <span>
                                    <FaHeart 
                                        className={location.pathname === appName + "/saved" ? "logoActive" : ""} 
                                    />
                                </span>
                            </Tooltip>
                        </MenuItemStyle>
                    </li>

                    <li>
                        <MenuItemStyle to={appName + "/saved"}>
                            <Tooltip title="Reset saved">
                                <span>
                                    <LuListRestart 
                                        className="button"
                                        onClick={() => handleResetApp()} 
                                    />
                                </span>
                            </Tooltip>
                        </MenuItemStyle>
                    </li>

                    <ToggleThemeButton onClick={handleToggleTheme}>
                        <Tooltip title="Toggle theme">
                            <span>{ theme === 'light' ? '🌙' : '☀️' }</span>
                        </Tooltip>
                    </ToggleThemeButton>
                </MenuStyle>

            </TopBarStyle>
        </HeaderStyle>
    );
}

export default Header;