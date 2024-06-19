import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { deletePhoto, imageTags, stateImagesPerPage, savedPhotos, savedQuery, updateImagesPerPage } from '../../store/searchResults/searchSlice';
import { SavedImg, SavedTags, SearchResultsProps, SelectedPic } from "../../helpers/interfaces";
import { FiFilter } from "react-icons/fi";

import styled from "styled-components";
import { Box, Button, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";

import { FormStyle, SearchBarStyle, SectionStyle } from "../../css/SavedResults";
import { getFilteredPhotos, getOrderedPhotos, getPhotosByTag, handleCopyUrl, handleDownload, handleSaveDescription } from "../../helpers/savedImagesFunctions";

import FiltersComponent from "./FiltersComponent";
import PaginationComponent from "./PaginationComponent";
import PopularTags from "../Tags/PopularTags";
import EditModal from "../shared/EditModal";
import Toast from "../../helpers/alerts/swal";
import { GetPopularTags } from "../../helpers/getPopularTags";
import ImagesMasonry from "./ImagesMasonry";

function SavedResults({currentPage, setPage}: SearchResultsProps) {
    const dispatch = useAppDispatch();
    const saved = useAppSelector(savedPhotos);
    const perPage: number = useAppSelector(stateImagesPerPage);
    const query = useAppSelector(savedQuery);
    const tags: SavedTags[] = useAppSelector(imageTags);
    const popularTags: SavedTags[] = GetPopularTags(tags);

    const [imagesPerPage, setImagesPerPage] = useState(perPage || 10);

    const [orderBy, setOrderBy] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [IsFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
    const [activeTag, setActiveTag] = useState('');
    const [selectedPic, setSelectedPic] = useState<SelectedPic>({
        id: '',
        src_regular: '',
        description: '',
        width: 0,
        height: 0,
        likes: 0,
        tags: []
    });

    const filterBySearch = getOrderedPhotos(getPhotosByTag(getFilteredPhotos(saved, query), activeTag), orderBy);
    
    const getPageImages = useMemo(() => {
        const startIndex = (currentPage - 1) * imagesPerPage;
        const endIndex = startIndex + imagesPerPage;
        return filterBySearch.slice(startIndex, endIndex);
    }, [currentPage, imagesPerPage, filterBySearch]);
    
    const pageItems = getPageImages;

    const handleImageModal = (image: SavedImg) => {
        setIsEditModalOpen(true);
        setSelectedPic(image);
    };

    const handleCloseImageModal = () => {
        setIsEditModalOpen(false);
    };

    const handleFiltersModal = () => setIsFiltersModalOpen(true);
    const handleClose = () => setIsFiltersModalOpen(false);

    const handleDelete = (image: SavedImg, pageImages: number) => {
        dispatch(deletePhoto(image.id));
        Toast.fire({
            icon: "success",
            html: `<h4 class="swal-success">Removed successfully</h4>`,
            background: "#499b49"
        });

        if(pageImages === 1 && currentPage !== 1){
            setPage(currentPage - 1);
        }
    };

    const handleImagesPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(currentPage > 1){
            setPage(1);
        }
        setImagesPerPage(Number(e.target.value));
        dispatch(updateImagesPerPage(Number(e.target.value)));
    }

    const resultsLength = filterBySearch.length;
    const getResultsFrom = ((currentPage - 1) * imagesPerPage) + 1;
    const getResultsTo = Math.min(currentPage * imagesPerPage, resultsLength);
    const inQuery = query !== "" ? `in query '${query}'` : "";

    useEffect(() => {
        if(activeTag !== '' && currentPage !== 1){
            setPage(1);
        }
    }, [activeTag])

    return (
        <>
            <SectionStyle>
                { resultsLength > 0
                    ?   <>
                            <SearchBarStyle>
                                <FormStyle >
                                    <small>{
                                        resultsLength > 0
                                            && `Showing ${getResultsFrom} to ${getResultsTo} of ${resultsLength} images ${inQuery}`
                                    }</small>

                                    <Button variant="contained" onClick={handleFiltersModal}>
                                        Filters
                                        <FiFilter style={{fontSize:'17px',marginLeft:'0.5rem'}}/>
                                    </Button>
                                </FormStyle>
                            </SearchBarStyle>

                            <PopularTags tags={popularTags} activeTag={activeTag} setTag={setActiveTag} />

                            <ImagesMasonry 
                                pageItems={pageItems} 
                                handleImageModal={handleImageModal}
                                handleDelete={handleDelete}
                                handleDownload={handleDownload}
                                handleCopyUrl={handleCopyUrl}
                            />
                        </>
                    :   saved.length > 0
                            ? <TextContainer>
                                <p>Nothing match</p>
                            </TextContainer>

                            : <TextContainer>
                                <p>Save images to see them here</p>
                            </TextContainer>
                }
                
            </SectionStyle>

            <EditModal 
                open={isEditModalOpen} 
                onClose={handleCloseImageModal} 
                onSave={(description: string) => handleSaveDescription(selectedPic.id, description, dispatch)} 
                image={selectedPic as SelectedPic} 
                isEditVisible={true}
            />

            <Modal
                open={IsFiltersModalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
            >
                <FiltersModalStyles>
                    <FiltersTitle id="modal-modal-title" variant="h6" style={{marginBottom:'2rem'}}>
                        Filters:
                    </FiltersTitle>

                    <FiltersComponent 
                        orderBy={orderBy} 
                        setOrderBy={setOrderBy} 
                        imagesPerPage={imagesPerPage} 
                        handleImagesPerPage={handleImagesPerPage}
                    />
                </FiltersModalStyles>
            </Modal>

            <PaginationComponent 
                filterBySearch={filterBySearch} 
                currentPage={currentPage}
                setPage={setPage}
                imagesPerPage={imagesPerPage}
            />
        </>
    )
}

const TextContainer = styled.div`
    padding-top: 1rem;
    text-align: center;
`;

const FiltersTitle = styled(Typography)`
    color: ${({ theme }) => theme.text};
`;

const FiltersModalStyles = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    background-color: ${({ theme }) => theme.html};
    border-radius: 0.5rem;
    filter: drop-shadow(1px 1px 1.2px rgb(0 0 0 / 0.6));
    box-shadow: 24;
    padding: 2rem 4rem 4rem 4rem;

    @media only screen and (max-width: 1024px) {
        width: 400px;
    }

    @media only screen and (max-width: 700px) {
        width: 50%;
        
    }
`;

export default SavedResults;