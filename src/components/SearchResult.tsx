import { useEffect, useState } from "react";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../hooks/store";
import { savePhoto, searchError, searchPhotos, searchQuery, searchStatus } from '../store/searchResults/searchSlice';
import { getRandomSearchThunk, getSearchThunk } from "../store/searchResults/searchThunk";

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Image } from "../helpers/interfaces";
import Tooltip from "./Tooltip";

function SearchResults() {
  const dispatch = useAppDispatch();
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const images = useAppSelector(searchPhotos);
  const query = useAppSelector(searchQuery);
  const status = useAppSelector(searchStatus);
  const error = useAppSelector(searchError);

  const handleSave = (img: Image) => {
    dispatch(savePhoto({
      id: img.id,
      src_preview: img.urls.small,
      src_regular: img.urls.regular,
      src_full: img.urls.full,
      alt_description: img.description,
      description: img.description === null ? 'unknown' : img.description,
      width: img.width,
      height: img.height,
      likes: img.likes,
      created_at: new Date(Date.now()).toLocaleDateString("es-ES"),
  }))
  }
  
  useEffect(() => {
      if(query !== ''){
        if (status === 'ready'){
          dispatch(getSearchThunk(query));
        } else if (status === 'pending') {
          setIsLoading(true);
        } else if (status === 'fulfilled') {
          setIsLoading(false);
        }
      } else if (query === ''){
        if (status === 'ready'){
          dispatch(getRandomSearchThunk());
        } else if (status === 'pending') {
          setIsLoading(true);
        } else if (status === 'fulfilled') {
          setIsLoading(false);
        }
      } else {
        alert(`Error: ${error}`)
      }

  }, [dispatch, images, query, status, error]);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SectionStyle>
          <ImageGridStyle>
              {!isLoading && Array.isArray(images) ? images.map((image) => {
                  return (
                      <ImageContainerStyle key={image.id} onClick={ () => handleSave(image) }>
                            <ImageItemStyle
                                src={(image.urls?.regular) ? image.urls.regular : image.urls.small}
                                width={400}
                                alt={image.description ? image.description : ''}
                                loading="lazy"
                            />
                            <ButtonContainer>
                              <Button>
                                <Tooltip text={'Save this image'}>
                                  <AddCircleOutlineOutlinedIcon />
                                </Tooltip>
                                <p style={{margin: '0'}}>Add to collection</p>
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
    padding: 7rem 10% 3rem 10%;

    @media only screen and (max-width: 1024px) {
      padding: 6rem 0% 3rem 4%;
    }

    @media only screen and (max-width: 700px) {
      padding: 9rem 0% 3rem 8%;
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
    position: relative;
    display: inline-block;
    margin-bottom: 15px;
    width: 100%;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.02);
    }
`

const ImageItemStyle = styled.img`
    width: 90%;
    display: block;
    border-radius: 5px;
    border: 1px solid #858585;
    cursor: pointer;

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    }
`

const ButtonContainer = styled.div`
  margin-top: 0.4rem;
  position: absolute;
  top: -0.2rem;
  left: 0.2rem;
`;

const Button = styled.button`
  padding: 0.2rem 0.2rem 0 0.2rem;
  background-color: ${({ theme }) => theme.header};
  color: ${({ theme }) => theme.headerH1};
  transition: opacity 0.3s ease;
  margin-right: 0.3rem;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: ;
  }
`;

export default SearchResults;