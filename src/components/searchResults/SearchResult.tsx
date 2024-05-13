import { useEffect, useState } from "react";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { savePhoto, savedPhotos, searchError, searchPhotos, searchQuery, searchStatus } from '../../store/searchResults/searchSlice';
import { getRandomSearchThunk, getSearchThunk } from "../../store/searchResults/searchThunk";

import { FaHeart } from "react-icons/fa";
import { Image, SavedImg, SelectedPic } from "../../helpers/interfaces";
import Toast from "../../helpers/alerts/swal";
import { formatImage } from "../../helpers/Images/formatImage";
import EditModal from "../savedResults/EditModal";
import { useParams } from "react-router-dom";
import { Tooltip } from "@mui/material";

function SearchResults() {
    const dispatch = useAppDispatch();
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const saved = useAppSelector(savedPhotos);
    const images = useAppSelector(searchPhotos);
    const query = useAppSelector(searchQuery);
    const status = useAppSelector(searchStatus);
    const error = useAppSelector(searchError);

    const params = useParams();
    console.log(params);
    // console.log(images);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPic, setSelectedPic] = useState<SelectedPic>({
        id: '',
        src_regular: '',
        description: '',
        width: 0,
        height: 0,
        likes: 0
    });

    const handleModal = (image: SavedImg) => {
        setIsModalOpen(true);
        setSelectedPic(image);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, img: Image) => {
        const target = e.target as HTMLDivElement;
        target.classList.add("heart-red");
        
        const isImageAlreadySaved = saved.find(image => image.id === img.id);
        if (isImageAlreadySaved) {
            Toast.fire({
                icon: "warning",
                html: `<h4 class="swal-warning">Already saved</h4>`,
                background: "#9b8249"
            })
            return;
        }

        const formatedImg = formatImage(img);

        dispatch(savePhoto(formatedImg))
        Toast.fire({
            icon: "success",
            html: `<h4 class="swal-success">Added successfully</h4>`,
            background: "#499b49"
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
                { images.length > 0
                    ?   <ImageGridStyle>
                            { images.map((image) => {
                                    return (
                                        <ImageContainerStyle key={image.id}>
                                            <Tooltip title="Click to details" followCursor>
                                                <ImageItemStyle
                                                    src={(image.urls?.small) ? image.urls.small : image.urls.regular}
                                                    width={400}
                                                    alt={image.description ? image.description : ''}
                                                    loading="lazy"
                                                    onClick={() => handleModal(formatImage(image))}
                                                />
                                            </Tooltip>

                                            <ButtonContainer onClick={ (e) => handleSave(e, image) }>
                                                <Button>
                                                    <Tooltip title="Add to saved">
                                                        <span>
                                                            <HeartIcon />
                                                        </span>
                                                    </Tooltip>
                                                </Button>
                                            </ButtonContainer>
                                        </ImageContainerStyle>
                                    )
                            })}
                        </ImageGridStyle>
                    : <TextContainer>
                        <p>Make a search to see something here</p>
                    </TextContainer>
                }
            </SectionStyle>

            <EditModal 
                open={isModalOpen} 
                onClose={handleCloseModal} 
                image={selectedPic as SelectedPic} 
                isEditVisible={false}
            />
        </>
    )
}

const TextContainer = styled.div`
    text-align: center;
`;

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
    cursor: zoom-in;
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