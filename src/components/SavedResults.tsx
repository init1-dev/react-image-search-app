import { useEffect, useState } from "react";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../hooks/store";
import { savePhoto, searchError, searchPhotos, searchQuery, searchStatus } from '../store/searchResults/searchSlice';
import { getRandomSearchThunk, getSearchThunk } from "../store/searchResults/searchThunk";

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { SavedImg, State } from "../helpers/interfaces";
import { useSelector } from "react-redux";

function SearchResults() {
  // const dispatch = useAppDispatch();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);

  const saved = useSelector((state: State) => state.saved.images)
  // const images = useAppSelector(searchPhotos);
  // const query = useAppSelector(searchQuery);
  // const status = useAppSelector(searchStatus);
  // const error = useAppSelector(searchError);

  return (
    <>
      <SectionStyle>
          <ImageGridStyle>
              {!isLoading ? saved.map((image: SavedImg) => {                
                  return (
                      <ImageContainerStyle key={image.id}>
                            <ImageItemStyle
                                src={image.src_regular}
                                width={400}
                                alt={image.description}
                                loading="lazy"
                            />
                            <ButtonContainer>
                              <Button>
                                <DeleteOutlineOutlinedIcon />
                              </Button>
                              <Button>
                                <FileDownloadOutlinedIcon />
                              </Button>
                              <Button>
                                <InfoOutlinedIcon />
                              </Button>
                            </ButtonContainer>
                      </ImageContainerStyle>
                    )
                }) : '<h1>Cargando..</h1>' }
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

export default SearchResults;