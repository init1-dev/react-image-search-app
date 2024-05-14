import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const HeaderStyle =styled.header`
    position: fixed;
    width: 100%;
    z-index: 1;
    top: 0;
    box-shadow: rgb(0 0 0 / 40%) 0px 2px 4px, rgb(0 0 0 / 30%) 0px 7px 13px -3px, rgb(0 0 0 / 20%) 0px -3px 0px inset;
`;

export const TopBarStyle = styled.div`
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

export const LogoStyle = styled(NavLink)`
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

export const FormStyle = styled.form`
    width: 100%;
    margin-left: 2rem;
`;

export const SearchBarStyle = styled.div`
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

export const MenuStyle = styled.ul`
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

export const MenuItemStyle = styled(NavLink)`
    span {
        display: flex;
        font-size: 20px;
        height: 100%;
        transition: color 0.2s ease;
        filter: drop-shadow(1px 1px 1.2px rgb(0 0 0 / 0.6));
    }

    &:hover {
        color: ${({ theme }) => theme.btnHoverText};
    }

    svg.button {
        color: ${({ theme }) => theme.text};
    }

    svg {
        color: red;
        transition: transform 0.15s ease-in-out;

        &:hover{
            transform: scale3d(1.2, 1.2, 0.3);
        }
    }
`;

export const ToggleThemeButton = styled.li`
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