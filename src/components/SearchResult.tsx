import { useEffect, useState } from "react";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../hooks/store";
import { savePhoto, searchError, searchPhotos, searchQuery, searchStatus } from '../store/searchResults/searchSlice';
import { getRandomSearchThunk, getSearchThunk } from "../store/searchResults/searchThunk";

import { FaHeart } from "react-icons/fa";
import { Image } from "../helpers/interfaces";
import Tooltip from "./Tooltip";
import Toast from "../helpers/alerts/swal";

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
            description: img.description === null ? img.alt_description : img.description,
            width: img.width,
            height: img.height,
            likes: img.likes,
            created_at: new Date(Date.now()).toLocaleDateString("es-ES"),
        }))
        Toast.fire({
            icon: "success",
            title: "Added successfully"
        })
    }

    useEffect(() => {
        if(query !== ''){
            if (status === 'ready'){
            dispatch(getSearchThunk(query));
            } else if (status === 'pending') {
            setIsLoading(true);
            } else if (status === 'fulfilled') {
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
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
        return (<span className="loader-container">
                <div className="loader"></div>
            </span>)
    }

    return (
        <>
        <SectionStyle>
            <ImageGridStyle>
                {!isLoading && Array.isArray(images) ? images.map((image) => {
                    return (
                        <ImageContainerStyle key={image.id}>
                                <ImageItemStyle
                                    src={(image.urls?.small) ? image.urls.small : image.urls.regular}
                                    width={400}
                                    alt={image.description ? image.description : ''}
                                    loading="lazy"
                                />
                                <ButtonContainer onClick={ () => handleSave(image) }>
                                <Button>
                                    <Tooltip text={'Add to saved'}>
                                    <HeartIcon />
                                    </Tooltip>
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
    padding: 7rem 10% 5rem 10%;

    @media only screen and (max-width: 1024px) {
        padding: 6rem 0% 4rem 4%;
    }

    @media only screen and (max-width: 700px) {
        padding: 9rem 0% 3rem 8%;
    }
`;

const HeartIcon = styled(FaHeart)`
    filter: drop-shadow(1px 1px 1.2px rgb(0 0 0 / 0.6));
    font-size: 20px;

    &:hover{
        color: red;
        fill: red;
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

const ImageItemStyle = styled.img`
    width: 90%;
    display: block;
    border-radius: 5px;
    border: 1px solid #858585;
    cursor: pointer;
`;

const ImageContainerStyle = styled.div`
    position: relative;
    display: inline-block;
    margin-bottom: 15px;
    width: 100%;
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.02);

        ${ImageItemStyle} {
            box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
        }
    }
`;

const ButtonContainer = styled.div`
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
`;

const Button = styled.button`
    background-color: unset;
    border: unset;
    color: white;

    &:hover {
        color: red;
    }
`;

export default SearchResults;