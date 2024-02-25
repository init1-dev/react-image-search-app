import { useSelector } from "react-redux";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import styled from "styled-components";

import { useAppDispatch } from "../hooks/store";
import { deletePhoto, searchByTerm } from '../store/searchResults/searchSlice';
import { SavedImg, State } from "../helpers/interfaces";
import { FormEvent, useState } from "react";

import { saveAs } from 'file-saver';

function SearchResults() {
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState('');
  const saved = useSelector((state: State) => state.saved.images)
  const query = useSelector((state: State) => state.saved.query)
  // const images = useAppSelector(searchPhotos);
  // const status = useAppSelector(searchStatus);
  // const error = useAppSelector(searchError);

  function getFilteredPhotos(photos:SavedImg[] , searchTerm: string) {
    const filtered = photos.filter(photo => photo.description?.toLowerCase().includes(searchTerm.toLowerCase()));
    return filtered;
  }

  const filterBySearch = getFilteredPhotos(saved, query);

  function handleSearchSubmit(e: FormEvent<HTMLFormElement>) {    
    e.preventDefault();
    dispatch(searchByTerm(searchInput))
    console.log(searchInput);
  }

  console.log(searchInput);
  

  const handleDownload = (url: string, description: string) => {
    saveAs(
      url,
      `${description}.jpg`
    );
  };

  return (
    <>
      <SectionStyle>
        <SearchBarStyle>
          <FormStyle onSubmit={ (e) => handleSearchSubmit(e) }>
            <SearchInputStyle type="search" autoComplete="off" name="" id="search-box" placeholder="Busca entre tus fotos.." value={searchInput} onChange={(e) => { setSearchInput(e.target.value) }} />
          </FormStyle>
        </SearchBarStyle>
        <ImageGridStyle>
          { filterBySearch && filterBySearch.map((image: SavedImg) => {                
            return (
              <ImageContainerStyle key={image.id}>
                    <ImageItemStyle
                        src={image.src_regular}
                        width={400}
                        alt={image.description}
                        loading="lazy"
                    />
                    <ButtonContainer>
                      <Button onClick={ () => dispatch(deletePhoto(image.id)) }>
                        <DeleteOutlineOutlinedIcon />
                      </Button>
                      <Button onClick={ () => (handleDownload(image.src_full, image.id)) }>
                        <FileDownloadOutlinedIcon />
                      </Button>
                      <Button>
                        <InfoOutlinedIcon />
                      </Button>
                      <span>{image.likes} likes</span>
                      <p>{image.description}</p>
                    </ButtonContainer>
              </ImageContainerStyle>
            )
          })}
        </ImageGridStyle>
      </SectionStyle>
    </>
  )
}

const SectionStyle= styled.main`
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

const ImageGridStyle = styled.div`
    column-count: 4;
    column-gap: 0;
    
    @media only screen and (max-width: 1024px) {
      column-count: 2;
    }

    @media only screen and (max-width: 700px) {
      column-count: 1;
    }
`

const ImageContainerStyle = styled.div`
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

const ImageItemStyle = styled.img`
    width: 90%;
    display: block;
    border-radius: 5px;
    transition: all 0.3s ease;
    border: 1px solid #858585;

    &:hover {
      transform: scale(1.02);
      box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    }
`

const ButtonContainer = styled.div`
  margin-top: 0.4rem;
`;

const Button = styled.button`
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

const SearchBarStyle = styled.div`
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

const FormStyle = styled.form`
  width: 100%;
  margin-right: 2rem;
`

const SearchInputStyle = styled.input`
  width: 100%;
  padding: 0.4rem 1rem;
  margin: 0;
  border-radius: 5rem;
  border: 1px solid #5d5d5d;
  outline: none;
  background-color: ${({ theme }) => theme.searchBarBg};
  box-shadow: rgb(0 0 0 / 40%) 1px 1px 2px;
  transition: background-color 0.1s;

  &:focus-visible {
    background-color: white;
  }

  @media only screen and (max-width: 1024px) {
    width: 100%;
  }
`

export default SearchResults;