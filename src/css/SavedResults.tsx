import styled from "styled-components";

export const SectionStyle= styled.main`
    background-color: ${({ theme }) => theme.body};
    padding: 1.5rem;
    margin: 6rem 10% 3rem 10%;

    @media only screen and (max-width: 1024px) {
      margin: 5rem 8% 3rem 8%
    }

    @media only screen and (max-width: 700px) {
      margin: 8rem 5% 2.5rem 5%
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
`

export const ImageContainerStyle = styled.div`
    display: inline-block;
    margin-bottom: 15px;
    width: 100%;

    @media only screen and (max-width: 1024px) {
      flex-direction: column;
      align-items: center;
    }

    @media only screen and (max-width: 700px) {
      display: flex;
      column-count: 1;
    }
`

export const ImageItemStyle = styled.img`
    width: 90%;
    display: block;
    border-radius: 5px;
    transition: all 0.3s ease;
    border: 1px solid #858585;
    cursor: pointer;

    &:hover {
      transform: scale(1.02);
      box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    }
`

export const ButtonContainer = styled.div`
  margin-top: 0.4rem;
`;

export const Button = styled.button`
  padding: 0.2rem 0.2rem 0 0.2rem;
  background-color: #dfdfdf;
  opacity: ;
  transition: opacity 0.3s ease;
  margin-right: 0.3rem;
  border-radius: 0.5rem;

  &:hover {
    color: #25ac25;
  }
`;

export const SearchBarStyle = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin: 0;
  margin-bottom: 2rem;
  padding: 0;
  font-size: 20px;
  font-weight: 900;
  color: ${({ theme }) => theme.headerH1};

  @media only screen and (max-width: 700px) {
    width: 100%;
  }
`;

export const FormStyle = styled.form`
  width: 100%;
  margin-right: 2rem;
  text-align: center;
`

export const SearchInputStyle = styled.input`
  width: 100%;
  padding: 0.4rem 1rem;
  margin: 0;
  margin-bottom: 1rem;
  border-radius: 5rem;
  border: 1px solid #5d5d5d;
  outline: none;
  background-color: ${({ theme }) => theme.searchBarBg};
  box-shadow: rgb(0 0 0 / 40%) 1px 1px 2px;
  transition: background-color 0.1s;

  &::placeholder {
    color: ${({ theme }) => theme.footerText};
    opacity: 1; /* Firefox */
  }

  &:focus::placeholder {
    color: ${({ theme }) => theme.footerText};
    filter: invert(100%);
  }
  
  &::-ms-input-placeholder { /* Edge 12 -18 */
    color: ${({ theme }) => theme.footerText};
  }

  &:focus::-ms-input-placeholder {
    color: ${({ theme }) => theme.footerText};
    filter: invert(100%);
  }

  &:focus-visible {
    background-color: white;
  }

  @media only screen and (max-width: 1024px) {
    width: 100%;
  }
`

export const SelectStyle = styled.select`
  padding: 0.8rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.searchBarBg};
  color: ${({ theme }) => theme.headerH1};
`