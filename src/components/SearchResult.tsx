import { useEffect, useState } from "react";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../hooks/store";
import { searchError, searchPhotos, searchQuery, searchStatus } from '../store/searchResults/searchSlice';
import { getRandomSearchThunk, getSearchThunk } from "../store/searchResults/searchThunk";

// import { RootState } from '../app/store';

function SearchResults() {
  const dispatch = useAppDispatch();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const images = useAppSelector(searchPhotos);
  const query = useAppSelector(searchQuery);
  const status = useAppSelector(searchStatus);
  const error = useAppSelector(searchError);
  
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
                      <ImageContainerStyle key={image.id}>
                            <ImageItemStyle
                                src={(image.urls?.regular) ? image.urls.regular : image.urls.small}
                                width={400}
                                alt={image.alt_description}
                                loading="lazy"
                            />
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
    column-gap: 10px;
    
    @media only screen and (max-width: 1024px) {
      column-count: 2;
    }

    @media only screen and (max-width: 700px) {
      column-count: 1;
    }
`

const ImageContainerStyle = styled.div`
    display: inline-block;
    margin-bottom: 25px;
    width: 100%;
`

const ImageItemStyle = styled.img`
    width: 90%;
    display: block;
    border-radius: 5px;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
      box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    }
`

export default SearchResults;