import { FormEvent, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { appName } from "../Routes";
import { useTheme } from "../hooks/themeHooks";
import { setStatusReady, setTerm } from "../store/searchResults/searchSlice";

import WallpaperOutlinedIcon from '@mui/icons-material/WallpaperOutlined';

interface HeaderProps {
  placeholder?: string,
}

const Header = ({ placeholder = "Introduce un término para buscar.." }: HeaderProps) => {
  const [searchInput, setSearchInput] = useState('');
  const { theme, handleToggleTheme } = useTheme();

  const dispatch = useDispatch()

  function handleSearchSubmit(e: FormEvent<HTMLFormElement>) {
    console.log("enviado");
    
    e.preventDefault();
    dispatch(setStatusReady());
    dispatch(setTerm(searchInput.trim()));
    // setSearchInput('');
  }

  return (
    <HeaderStyle>
      <TopBarStyle>

          <SearchBarStyle>
            <LogoStyle to={appName}>
              <WallpaperOutlinedIcon />
            </LogoStyle>
            <FormStyle onSubmit={ (e) => handleSearchSubmit(e) }>
              <SearchInputStyle type="search" autoComplete="off" name="" id="search-box" placeholder={ placeholder } value={searchInput} onChange={(e) => { setSearchInput(e.target.value) }} />
            </FormStyle>
          </SearchBarStyle>

          <MenuStyle>
            <li>
                <MenuItemStyle className="fa-regular fa-bookmark" to={appName + "/saved"}></MenuItemStyle>
                
            </li>
            <li>
                <MenuItemStyle className="fa-regular fa-address-card" to={appName + "/contact"}></MenuItemStyle>
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
  top: 0;
  box-shadow: rgb(0 0 0 / 40%) 0px 2px 4px, rgb(0 0 0 / 30%) 0px 7px 13px -3px, rgb(0 0 0 / 20%) 0px -3px 0px inset;

  @media only screen and (max-width: 1024px) {

  }

  @media only screen and (max-width: 700px) {

  }
`;

const TopBarStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  gap: 5rem;

  @media only screen and (max-width: 1024px) {

  }

  @media only screen and (max-width: 700px) {
    flex-direction: column;
    gap: 0;
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
`

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

const SearchInputStyle = styled.input`
  width: 100%;
  padding: 0.4rem 1rem;
  margin: 0 0 0 2rem;
  border-radius: 5rem;
  border: 1px solid #5d5d5d;
  outline: none;
  background-color: #EEEEEE;
  box-shadow: rgb(0 0 0 / 40%) 1px 1px 2px;
  transition: background-color 0.1s;

  &:focus-visible {
    background-color: white;
  }

  @media only screen and (max-width: 700px) {
    margin-left: 1rem;
  }
`

const MenuStyle = styled.ul`
  width: 40%;
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: space-around;
  list-style-type: none;
  padding-inline-start: 0;

  @media only screen and (max-width: 700px) {
    width: 80%;
    margin: 0;
    padding-top: 1rem;
  }
`

const MenuItemStyle = styled(NavLink)`
  font-size: 20px;
  height: 100%;
  color: ${({ theme }) => theme.btnText};
  transition: color 0.1s ease;

  &:hover {
    color: ${({ theme }) => theme.btnHoverText};
  }
`

const ToggleThemeButton = styled.li`
  background-color: ${({ theme }) => theme.themeButtonBg};
  border: 1px;
  border-color: ${({ theme }) => theme.themeButtonBg};
  padding: 0.5rem;
  cursor: pointer;
  font-size: 15px;
  border-radius: 5px;
  box-shadow: rgb(0 0 0 / 40%) 1px 1px 2px, rgb(0 0 0 / 30%) 0px 7px 13px -3px, rgb(0 0 0 / 20%) 0px -3px 0px inset;
`;

export default Header;