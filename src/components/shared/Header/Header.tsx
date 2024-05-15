import { ChangeEvent, FormEvent, useContext, useState } from "react";
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
import { SearchContext } from "../../../helpers/SearchContext";

const Header = ({currentPage, setPage}: SearchResultsProps) => {
    const currentPath = useLocation();
    const Search = useContext(SearchContext);
    const query = useAppSelector(Search ? savedQuery : searchQuery);
    
    const [searchInput, setSearchInput] = useState(query);
    const { theme, handleToggleTheme } = useTheme();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(Search) {
            dispatch(searchByTerm(searchInput));
        } else {
            dispatch(setStatusReady());
            dispatch(setTerm(searchInput.trim()));
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const updatedInput = e.currentTarget.value;
        setSearchInput(updatedInput);

        if(Search){
            
            if(currentPage !== 1){
                navigate(setPageNavigate(currentPath.pathname, 1));
                setPage(1);
            }
    
            dispatch(searchByTerm(updatedInput));
        }
    }

    const handleResetApp = () => {
        dispatch(clearSaved());
    }

    const placeholder = (currentPath.pathname === appName)
        ? "Search by term"
        : "Search in your images";

    const customMessage = Search
        ? "Last search in saved: " + query
        : "Last search: " + query

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
                            placeholder={query ? customMessage : placeholder}
                            handleChange={handleChange}
                            searchInput={searchInput}
                            setSearchInput={setSearchInput}
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