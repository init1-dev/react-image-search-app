import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { deletePhoto, editDescription, imageTags, savedQuery } from '../../store/searchResults/searchSlice';
import { SavedImg, SavedTags, SearchResultsProps, SelectedPic, State } from "../../helpers/interfaces";

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { MdContentCopy } from "react-icons/md";

import { saveAs } from 'file-saver';
import { Button, ButtonContainer, DownloadButton, FormStyle, ImageContainerStyle, ImageItemStyle, SearchBarStyle, SectionStyle, SelectStyle } from "../../css/SavedResults";
import EditModal from "../shared/EditModal";
import Toast from "../../helpers/alerts/swal";
import styled from "styled-components";
import { handleCopyUrl } from "../../helpers/handleCopyUrl";
import PaginationComponent from "./PaginationComponent";
import { Tooltip } from "@mui/material";
import PopularTags from "../Tags/PopularTags";
import { GetPopularTags } from "../../helpers/getPopularTags";

import Masonry from '@mui/lab/Masonry';

function SavedResults({currentPage, setPage}: SearchResultsProps) {
    const dispatch = useAppDispatch();
    const saved = useSelector((state: State) => state.saved.images);
    const query = useAppSelector(savedQuery);
    const tags: SavedTags[] = useAppSelector(imageTags);
    const popularTags: SavedTags[] = GetPopularTags(tags);

    const imagesPerPage = 15;

    const [orderBy, setOrderBy] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const getFilteredPhotos = (images:SavedImg[] , searchTerm: string) => {
        const filtered = images.filter(image => image.description?.toLowerCase().includes(searchTerm.toLowerCase()));
        return filtered;
    };

    const getPhotosByTag = (images: SavedImg[], tag: string) => {
        if(activeTag === ""){
            return images;
        }
        const imagesWithTag = images.filter(image => {
            const tags = image.tags.map(tag => tag.title);
            return tags.includes(tag);
        });
        return imagesWithTag;
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
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveDescription = (id: string, newDescription: string) => {
        dispatch(editDescription({ id, newDescription }))
    };

    const filterBySearch = getOrderedPhotos(getPhotosByTag(getFilteredPhotos(saved, query), activeTag), orderBy);
    
    const getPageImages = useMemo(() => {
        const startIndex = (currentPage - 1) * imagesPerPage;
        const endIndex = startIndex + imagesPerPage;
        return filterBySearch.slice(startIndex, endIndex);
    }, [currentPage, imagesPerPage, filterBySearch]);
    
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
            html: `<h4 class="swal-success">Removed successfully</h4>`,
            background: "#499b49"
        });

        if(pageImages === 1 && currentPage !== 1){
            setPage(currentPage - 1);
        }
    };

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

                            <PopularTags tags={popularTags} activeTag={activeTag} setTag={setActiveTag} />

                            <Masonry 
                                columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
                                spacing={3}
                                style={{overflow:'hidden', display:'flex'}}
                            >
                            { pageItems.map((image: SavedImg) => {
                                return (
                                <ImageContainerStyle key={image.id}>
                                    <Tooltip title="Click to details" followCursor>
                                        <ImageItemStyle
                                            src={image.src_preview}
                                            // width={400}
                                            alt={image.description}
                                            onClick={() => handleModal(image)}
                                        />
                                    </Tooltip>
                                    <ButtonContainer>
                                        <Button>
                                            <Tooltip title={'Remove from saved'}>
                                                <span>
                                                    <DeleteOutlineOutlinedIcon onClick={ () => handleDelete(image, pageItems.length) } />
                                                </span>
                                            </Tooltip>
                                        </Button>
                                        <Button onClick={ () => (handleDownload(image.src_full, image.id)) }>
                                            <Tooltip title={'Download image'}>
                                                <span>
                                                    <DownloadButton />
                                                </span>
                                            </Tooltip>
                                        </Button>
                                        <Button onClick={ () => (handleCopyUrl(image.src_regular)) }>
                                            <Tooltip title={'Copy url'}>
                                                <span>
                                                    <CopyUrlButton />
                                                </span>
                                            </Tooltip>
                                        </Button>
                                        <Button>
                                            <Tooltip title={'Get info'}>
                                                <span>
                                                    <InfoOutlinedIcon onClick={() => handleModal(image)} />
                                                </span>
                                            </Tooltip> 
                                        </Button>
                                        <span className="shadow">{image.likes} ❤️</span>
                                    </ButtonContainer>
                                </ImageContainerStyle>
                                )
                            })}
                            </Masonry >
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
                open={isModalOpen} 
                onClose={handleCloseModal} 
                onSave={(description: string) => handleSaveDescription(selectedPic.id, description)} 
                image={selectedPic as SelectedPic} 
                isEditVisible={true}
            />

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

const CopyUrlButton = styled(MdContentCopy)`
    font-size: 18px;
`;

export default SavedResults;