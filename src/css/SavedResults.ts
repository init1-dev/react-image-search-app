import styled from "styled-components";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

export const SectionStyle= styled.main`
    background-color: ${({ theme }) => theme.body};
    padding: 1.5rem;
    padding-top: unset;
    margin: 6rem 10% 0% 10%;

    @media only screen and (max-width: 1024px) {
        margin: 6rem 8% 0% 8%
    }

    @media only screen and (max-width: 700px) {
        margin: 9rem 0% 0% 0%
    }
`;

export const ImageGridStyle = styled.div`
    column-count: 4;
    column-gap: 0;
    
    @media only screen and (max-width: 1024px) {
        column-count: 2;
    }

    @media only screen and (max-width: 700px) {
        column-count: 1;
    }
`;

export const ImageItemStyle = styled.img`
    width: 90%;
    display: block;
    border-radius: 5px;
    filter: drop-shadow(1px 1px 1.2px rgb(0 0 0 / 0.6));
    cursor: zoom-in;
    transition: all 0.3s ease;

    @media only screen and (max-width: 700px) {
        width: 100%;
    }
`;

export const ButtonContainer = styled.div`
    padding: 0.2rem;
    display: inline-flex;
    position: absolute;
    top: 0.3rem;
    left: 0.3rem;
    border-radius: 0.3rem;
    background-color: rgba(55, 62, 73, 0.6);
    box-shadow: 1px 1px 5px black;

    span {
        color: white;
        display: flex;
        align-items: center;
        margin-left: 0.5rem;
    }
`;

export const Button = styled.button`
    padding: unset;
    background-color: unset;
    border: unset;
    margin-right: 0rem;
    cursor: pointer;
    filter: drop-shadow(1px 1px 1.2px rgb(0 0 0 / 0.6));

    &:focus, &:focus-visible {
        outline: unset;
    }

    span svg {
        color: white;

        &:hover {
            color: #0fe10f;
        }
    }
`;

export const ImageContainerStyle = styled.div`
    display: inline-block;
    position: relative;
    margin-bottom: 15px;
    width: 100%;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.02);

        ${ImageItemStyle} {
            box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
        }
    }

    @media only screen and (max-width: 1024px) {
        align-items: center;
    }

    @media only screen and (max-width: 700px) {
        column-count: 1;
    }
`;

export const DownloadButton = styled(FileDownloadOutlinedIcon)`
    
`;

export const SearchBarStyle = styled.div`
    display: flex;
    width: 100%;
    gap: 5rem;
    align-items: center;
    justify-content: center;
    margin: 0;
    margin-bottom: 2rem;
    padding: 0;
    font-size: 20px;
    font-weight: 900;
    color: ${({ theme }) => theme.headerH1};

    @media only screen and (max-width: 700px) {
        display: block;
        margin-bottom: 1rem;
    }
`;

export const FormStyle = styled.form`
    display: flex;
    width: 100%;
    gap: 2rem;
    align-items: center;
    justify-content: center;
    margin-right: 2rem;
    text-align: center;

    @media only screen and (max-width: 700px) {
        flex-direction: column;
        gap: 1rem;
    }
`;

export const SearchInputStyle = styled.input`
    width: 78%;
    padding: 0.8rem;
    margin: 0;
    border-radius: 1rem;
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
        width: 100%;
        margin-bottom: 1rem;
    }
`;

export const SelectStyle = styled.select`
    filter: drop-shadow(1px 1px 1.2px rgb(0 0 0 / 0.6));
    border-color: transparent;
    border-right: 1rem solid transparent;
    padding: 0.5rem 1rem 0.5rem 1rem;
    border-radius: 1rem;
    background-color: ${({ theme }) => theme.searchBarBg};
    color: ${({ theme }) => theme.headerH1};

    &:focus, &:focus-visible{
        outline: unset;
    }

    @media only screen and (max-width: 700px) {
        width: 100%;
    }
`;