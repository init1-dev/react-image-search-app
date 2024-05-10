import { FormEvent, useState } from "react";
import { NavLink, useLocation  } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { appName } from "../Routes";
import { useTheme } from "../hooks/themeHooks";
import { searchByTerm, setStatusReady, setTerm } from "../store/searchResults/searchSlice";

import WallpaperOutlinedIcon from '@mui/icons-material/WallpaperOutlined';
import { FaHeart } from "react-icons/fa";

const Header = () => {
    const [searchInput, setSearchInput] = useState('');
    const { theme, handleToggleTheme } = useTheme();
    const currentPath = useLocation();

    const dispatch = useDispatch();

    const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if(currentPath.pathname === appName){
            dispatch(setStatusReady());
            dispatch(setTerm(searchInput.trim()));
        } else {
            dispatch(searchByTerm(searchInput))
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedInput = e.currentTarget.value;
        setSearchInput(updatedInput);

        if(currentPath.pathname !== appName){
            dispatch(searchByTerm(updatedInput));
        }
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
                    <SearchInputStyle 
                        type="search" 
                        autoComplete="off" 
                        name="" 
                        id="search-box" 
                        placeholder={ placeholder } 
                        value={searchInput} 
                        onChange={(e) => { handleChange(e) }} />
                    </FormStyle>
                </SearchBarStyle>

                <MenuStyle>
                    <li>
                        <MenuItemStyle to={appName + "/saved"}>
                            <FaHeart className={location.pathname === appName + "/saved" ? "logoActive" : ""} />
                        </MenuItemStyle>
                    </li>
                    <ToggleThemeButton onClick={handleToggleTheme}>
                    {theme === 'light' ? '🌙' : '☀️'}
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
    gap: 5rem;
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
    transition: transform 0.1s;
    transform-origin: center center;
    height: 100%;
    display: contents;

    &:hover {
        transform: scale(1.05);
    }
`;

const FormStyle = styled.form`
    width: 100%
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
        margin-right: 1.2rem
    }
`;

const SearchInputStyle = styled.input`
    width: 100%;
    padding: 0.6rem 1rem;
    margin: 0 0 0 2rem;
    border-radius: 5rem;
    border: 1px solid #5d5d5d;
    outline: none;
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.searchBarBg};
    box-shadow: rgb(0 0 0 / 40%) 1px 1px 2px;
    transition: background-color 0.1s;

    &::placeholder {
        color: ${({ theme }) => theme.footerText};
        opacity: 1; /* Firefox */
    }

    &:focus::placeholder {
        color: ${({ theme }) => theme.footerText};
    }
    
    &::-ms-input-placeholder { /* Edge 12 -18 */
        color: ${({ theme }) => theme.footerText};
    }

    &:focus::-ms-input-placeholder {
        color: ${({ theme }) => theme.footerText};
    }

    &:focus-visible {
        color: black;
        background-color: white;
    }

    @media only screen and (max-width: 700px) {
        margin-left: 1rem;
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
    font-size: 15px;
    filter: drop-shadow(1px 1px 1.2px rgb(0 0 0 / 0.6));
`;

// @media only screen and (max-width: 1024px) (max-width: 700px)

export default Header;