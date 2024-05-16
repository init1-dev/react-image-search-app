import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams  } from "react-router-dom";
import { useDispatch } from "react-redux";

import { appName } from "../../../Routes";
import { useTheme } from "../../../hooks/themeHooks";
import { clearSaved, savedPhotos, savedQuery, searchByTerm, searchQuery, setStatusReady, setTerm } from "../../../store/searchResults/searchSlice";

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
import Toast, { PopUp } from "../../../helpers/alerts/swal";

const Header = ({currentPage, setPage}: SearchResultsProps) => {
    const currentPath = useLocation();
    const Search = useContext(SearchContext);
    const saved = useAppSelector(savedPhotos);
    const savedLength = saved.length;
    const query = useAppSelector(Search ? savedQuery : searchQuery);
    const { reset } = useParams();
    
    const [searchInput, setSearchInput] = useState(query);
    const { theme, handleToggleTheme } = useTheme();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(reset === '1'){
            setSearchInput('');
            navigate(appName + "/saved");
        }
    }, [reset, navigate])

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
        if(savedLength > 0){
            PopUp.fire({
                icon: "error",
                title: `<small style="all:unset;">¿Are you sure?</small>`,
                html: `<small>Your gallery will be cleared</small>`,
                confirmButtonColor: 'red'
            })
            .then((result) => {
                if(result.isConfirmed){
                    Toast.fire({
                        icon: "success",
                        html: `<h4 class="swal-success">Cleared successfully</h4>`,
                        background: "#499b49"
                    });
                    dispatch(clearSaved());
                }
            })
        } else {
            Toast.fire({
                icon: "warning",
                html: `<h4 class="swal-warning">Already empty</h4>`,
                background: "#9b8249"
            });
        }
    }

    const placeholder = (currentPath.pathname === appName)
        ? "Search by term"
        : "Search saved by description";

    const customMessage = Search
        ? "Last search in saved: " + query
        : "Last search: " + query

    const location = useLocation();

    return (
        <HeaderStyle>
            <TopBarStyle>

                <SearchBarStyle>
                    <LogoStyle to="/" className="logo">
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
                        <MenuItemStyle to="/saved">
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
                        <MenuItemStyle to="/saved">
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