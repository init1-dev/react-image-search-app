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
import { IconButton, Tooltip } from "@mui/material";

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
                        <WallpaperOutlinedIcon className={location.pathname === appName ? "logoActive" : ""} />
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
                            <FaHeart 
                                className={location.pathname === appName + "/saved" ? "logoActive" : ""} 
                            />
                        </MenuItemStyle>
                    </li>

                    <li>
                        <MenuItemStyle to={appName + "/saved"}>
                            <Tooltip title="Reset saved">
                                <IconButton>
                                    <LuListRestart 
                                        className="button" 
                                        onClick={() => handleResetApp()} 
                                    />
                                </IconButton>
                            </Tooltip>
                        </MenuItemStyle>
                    </li>

                    <ToggleThemeButton onClick={handleToggleTheme}>
                        { theme === 'light' ? '🌙' : '☀️' }
                    </ToggleThemeButton>
                </MenuStyle>

            </TopBarStyle>
        </HeaderStyle>
    );
}

export default Header;