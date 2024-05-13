import { ChangeEvent, FormEvent, useState } from "react";
import { NavLink, useLocation, useNavigate  } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { appName } from "../../Routes";
import { useTheme } from "../../hooks/themeHooks";
import { savedQuery, searchByTerm, searchQuery, setStatusReady, setTerm } from "../../store/searchResults/searchSlice";

import WallpaperOutlinedIcon from '@mui/icons-material/WallpaperOutlined';
import { FaHeart } from "react-icons/fa";
import { SearchResultsProps } from "../../helpers/interfaces";
import { setPageNavigate } from "../../helpers/pageFunctions";

import SearchComponent from "../SearchComponent";
import { useAppSelector } from "../../hooks/store";

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
                        <SearchComponent placeholder={query ? "Last search: " + query : placeholder} handleChange={handleChange} />
                    </FormStyle>
                </SearchBarStyle>

                <MenuStyle>
                    <li>
                        <MenuItemStyle to={appName + "/saved"}>
                            <FaHeart className={location.pathname === appName + "/saved" ? "logoActive" : ""} />
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

const HeaderStyle =styled.header`
    position: fixed;
    width: 100%;
    z-index: 1;
    top: 0;
    box-shadow: rgb(0 0 0 / 40%) 0px 2px 4px, rgb(0 0 0 / 30%) 0px 7px 13px -3px, rgb(0 0 0 / 20%) 0px -3px 0px inset;
`;

const TopBarStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    gap: 2rem;
    height: 65px;

    @media only screen and (max-width: 700px) {
        flex-direction: column;
        gap: 0;
        height: auto;
        padding: 1rem 0;
    }
`;

const LogoStyle = styled(NavLink)`
    color: ${({ theme }) => theme.headerH1};
    height: 100%;
    display: contents;

    svg {
        transition: transform 0.15s ease-in-out;
        text-rendering: optimizeLegibility;

        &:hover{
            transform: scale(1.1);
        }
    }
`;

const FormStyle = styled.form`
    width: 100%;
    margin-left: 2rem;
`;

const SearchBarStyle = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    margin: 0;
    padding: 0;
    font-size: 20px;
    font-weight: 900;
    color: ${({ theme }) => theme.headerH1};

    @media only screen and (max-width: 700px) {
        width: 85%;
    }
`;

const MenuStyle = styled.ul`
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    list-style-type: none;
    padding-inline-start: 0;

    @media only screen and (max-width: 700px) {
        width: 100%;
        height: 30px;
        margin: 0;
        padding-top: 1rem;
    }
`;

const MenuItemStyle = styled(NavLink)`
    display: flex;
    font-size: 20px;
    height: 100%;
    transition: color 0.2s ease;
    filter: drop-shadow(1px 1px 1.2px rgb(0 0 0 / 0.6));

    &:hover {
        color: ${({ theme }) => theme.btnHoverText};
    }

    svg {
        color: red;
        transition: transform 0.15s ease-in-out;

        &:hover{
            transform: scale3d(1.2, 1.2, 0.3);
        }
    }
`;

const ToggleThemeButton = styled.li`
    cursor: default;
    display: flex;
    font-size: 18px;
    transition: transform 0.1s;
    filter: drop-shadow(1px 1px 1.2px rgb(0 0 0 / 0.6));

    &:hover {
        transform: scale(1.2);
    }
`;

// @media only screen and (max-width: 1024px) (max-width: 700px)

export default Header;