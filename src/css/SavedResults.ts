import styled from "styled-components";

export const SectionStyle= styled.main`
    background-color: ${({ theme }) => theme.body};
    padding: 6rem 10% 2rem 10%;

    @media only screen and (max-width: 1024px) {
        padding: 6rem 2% 2rem 4%;
    }

    @media only screen and (max-width: 700px) {
        padding: 9rem 4% 1rem 8%;
    }
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
        width: 90%;
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