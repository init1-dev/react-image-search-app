import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { useAppDispatch } from "../hooks/store";
import { deletePhoto, editDescription } from '../store/searchResults/searchSlice';
import { SavedImg, SelectedPic, State } from "../helpers/interfaces";

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { MdFirstPage } from "react-icons/md";
import { MdLastPage } from "react-icons/md";
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";

import Tooltip from "./Tooltip";
import { saveAs } from 'file-saver';
import { Button, ButtonContainer, DownloadButton, FormStyle, ImageContainerStyle, ImageGridStyle, ImageItemStyle, SearchBarStyle, SectionStyle, SelectStyle } from "../css/SavedResults";
import EditModal from "./EditModal";
import Toast from "../helpers/alerts/swal";
import styled from "styled-components";

function SearchResults() {
    const dispatch = useAppDispatch();
    const saved = useSelector((state: State) => state.saved.images);
    const query = useSelector((state: State) => state.saved.query);

    const [page, setPage] = useState(1);
    const imagesPerPage = 15;

    const handlePageChange = (e: React.MouseEvent<HTMLButtonElement>, pageNumber: number) => {
        e.preventDefault();
        e.stopPropagation();
        setPage(pageNumber);
    }

    const [orderBy, setOrderBy] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPic, setSelectedPic] = useState<SelectedPic>({
        id: '',
        src_regular: '',
        description: '',
        width: 0,
        height: 0,
        likes: 0
    });

    const getFilteredPhotos = (images:SavedImg[] , searchTerm: string) => {
        const filtered = images.filter(image => image.description?.toLowerCase().includes(searchTerm.toLowerCase()));
        return filtered;
    }

    const getOrderedPhotos = (images: SavedImg[], filter: string) => {
        if (filter === 'newer') {
            return images.sort((prevPhoto: SavedImg, nextPhoto: SavedImg) => {
                    const prevDate = new Date(prevPhoto.created_at);
                    const nextDate = new Date(nextPhoto.created_at);
                    return nextDate.getTime() - prevDate.getTime();
            }).reverse();
        }
        return images.sort((prevPhoto: SavedImg, nextPhoto: SavedImg) => {
            const nextValue = nextPhoto[filter as keyof SavedImg];
            const prevValue = prevPhoto[filter as keyof SavedImg];

            if(typeof nextValue !== 'number' || typeof prevValue !== 'number'){
                return 0;
            }

            return nextValue - prevValue;
        });
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveDescription = (id: string, newDescription: string) => {    
        dispatch(editDescription({ id, newDescription }))
    };

    const filterBySearch = getOrderedPhotos(getFilteredPhotos(saved, query), orderBy);
    const totalPages = Math.ceil(filterBySearch.length / imagesPerPage);
    
    const getPageImages = useMemo(() => {
        const startIndex = (page - 1) * imagesPerPage;
        const endIndex = startIndex + imagesPerPage;
        return filterBySearch.slice(startIndex, endIndex);
    }, [page, imagesPerPage, filterBySearch]);
    
    const pageItems = getPageImages;

    const handleDownload = (url: string, description: string) => {
        saveAs(
        url,
        `${description}.jpg`
        );
    };

    const handleModal = (image: SavedImg) => {
        setIsModalOpen(true);
        setSelectedPic(image);
    };

    const handleDelete = (image: SavedImg, pageImages: number) => {
        dispatch(deletePhoto(image.id));
        Toast.fire({
            icon: "success",
            title: "Removed successfully"
        });

        if(pageImages === 1 && page !== 1){
            setPage(page - 1);
        }
    };

    const renderPageNumbers = () => {
        const pagesArray = Array.from(Array(totalPages), (_, index) => index + 1 );
        let startPage = page - 1;
        let endPage = page + 1;

        if(startPage <= 1) {
            startPage = 1;
            endPage = Math.min(startPage + 2, totalPages);
        }

        if(endPage >= totalPages) {
            endPage = totalPages;
            startPage = Math.max(endPage - 2, 1);
        }

        return pagesArray.slice(startPage - 1, endPage);
    }

    return (
        <>
            <SectionStyle>
                <SearchBarStyle>
                    <FormStyle >
                        <small>
                            Showing {((page - 1) * imagesPerPage) + 1} to {Math.min(page * imagesPerPage, saved.length)} of {saved.length} images
                        </small>

                        <SelectStyle id="orderSelect" value={orderBy} onChange={ (e) => setOrderBy(e.target.value) }>
                            <option value="" hidden disabled>Filter</option>
                            <option value="older">Older</option>
                            <option value="newer">Newer</option>
                            <option value="width">Width</option>
                            <option value="height">Height</option>
                            <option value="likes">Likes</option>
                        </SelectStyle>

                        {/* <label htmlFor="itemsSelect"><small>Img/Page</small></label>
                        <SelectStyle id="itemsSelect" value={5} onChange={ () => {} }>
                            <option value="" hidden disabled>5</option>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                        </SelectStyle> */}
                    </FormStyle>
                </SearchBarStyle>
                <ImageGridStyle>
                { pageItems.map((image: SavedImg) => {
                    return (
                    <ImageContainerStyle key={image.id}>
                        <ImageItemStyle
                            src={image.src_preview}
                            width={400}
                            alt={image.description}
                            onClick={() => handleModal(image)}
                        />
                        <ButtonContainer>
                            <Button>
                                <Tooltip text={'Remove from saved'}>
                                    <DeleteOutlineOutlinedIcon onClick={ () => handleDelete(image, pageItems.length) } />
                                </Tooltip>
                            </Button>
                            <Button onClick={ () => (handleDownload(image.src_full, image.id)) }>
                                <Tooltip text={'Download image'}>
                                    <DownloadButton />
                                </Tooltip>
                            </Button>
                            <Button>
                                <Tooltip text={'Get info'}>
                                    <InfoOutlinedIcon onClick={() => handleModal(image)} />
                                </Tooltip> 
                            </Button>
                            <span className="shadow">{image.likes} ❤️</span>
                        </ButtonContainer>
                    </ImageContainerStyle>
                    )
                })}
                </ImageGridStyle>
            </SectionStyle>
            <EditModal 
                open={isModalOpen} 
                onClose={handleCloseModal} 
                onSave={(description: string) => handleSaveDescription(selectedPic.id, description)} 
                image={selectedPic as SelectedPic} />
            <Pagination>
                {
                    filterBySearch.length > 15 &&
                    <>
                        <PaginationButton type="button" className={page === 1 ? "disabled" : ""} disabled={page === 1} onClick={(e) => handlePageChange(e, 1)}>
                            <MdFirstPage />
                        </PaginationButton>
                        <PaginationButton type="button" className={page === 1 ? "disabled" : ""} disabled={page === 1} onClick={(e) => handlePageChange(e, page - 1)}>
                            <IoMdArrowDropleft />
                        </PaginationButton>
                        {renderPageNumbers().map((pageNumber) => (
                            <PaginationButton 
                                type="button"
                                key={pageNumber} 
                                onClick={(e) => handlePageChange(e, pageNumber)}
                                className={pageNumber === page ? 'active' : ""}
                            >
                                { pageNumber }
                            </PaginationButton>
                        ))}
                        <PaginationButton type="button" className={page === totalPages ? "disabled" : ""} disabled={page === totalPages} onClick={(e) => handlePageChange(e, page + 1)}>
                            <IoMdArrowDropright />
                        </PaginationButton>
                        <PaginationButton type="button" className={page === totalPages ? "disabled" : ""} disabled={page === totalPages} onClick={(e) => handlePageChange(e, totalPages)}>
                            <MdLastPage />
                        </PaginationButton>
                    </>
                }
            </Pagination>
        </>
    )
}

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 5rem;

    @media only screen and (max-width: 700px) {
        justify-content: space-between;
        gap: unset;
        margin: 0 1.5rem;
        margin-bottom: 5rem;
    }
`;

const PaginationButton = styled.button`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0.5rem 0.75rem;
    aspect-ratio: 16/9;
    border-radius: 0.25rem;
    border: unset;
    color: black;

    &.active {
        color: black;
        font-weight: 800;
        background-color: #0fe10f;
    }
`;

export default SearchResults;