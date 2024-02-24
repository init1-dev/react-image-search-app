import styled from "styled-components";

import { useAppSelector } from "../hooks/store";
import { searchLoading, searchError, searchPhotos } from '../store/searchResults/searchSlice';

// import { RootState } from '../app/store';

function SearchResults() {
  const images = useAppSelector(searchPhotos);
  const loading = useAppSelector(searchLoading);
  const error = useAppSelector(searchError);

  console.log(images.length);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: { error }</div>;
  }

  return (
    <>
      <SectionStyle>
          <ImageGridStyle>
              {!loading && images ? images.map((image) => {
                  return (
                      <ImageContainerStyle key={image.id}>
                            <ImageItemStyle
                                src={image.urls.regular}
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
      transform: scale(1.2);
      box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    }
`

export default SearchResults;