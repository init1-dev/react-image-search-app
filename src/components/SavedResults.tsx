import { useSelector } from "react-redux";
import { useState } from "react";
import { useAppDispatch } from "../hooks/store";
import { deletePhoto, editDescription } from '../store/searchResults/searchSlice';
import { SavedImg, SelectedPic, State } from "../helpers/interfaces";

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import Tooltip from "./Tooltip";
import { saveAs } from 'file-saver';
import { Button, ButtonContainer, DownloadButton, FormStyle, ImageContainerStyle, ImageGridStyle, ImageItemStyle, SearchBarStyle, SectionStyle, SelectStyle } from "../css/SavedResults";
import EditModal from "./EditModal";
import Toast from "../helpers/alerts/swal";


function SearchResults() {
    const dispatch = useAppDispatch();

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

    const saved = useSelector((state: State) => state.saved.images)
    const query = useSelector((state: State) => state.saved.query)

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

    const handleDelete = (image: SavedImg) => {
        dispatch(deletePhoto(image.id));
        Toast.fire({
            icon: "success",
            title: "Removed successfully"
        })
    };

    return (
        <>
        <SectionStyle>
            <SearchBarStyle>
            <FormStyle >
                <SelectStyle id="orderSelect" value={orderBy} onChange={ (e) => setOrderBy(e.target.value) }>
                <option value="older">Older</option>
                <option value="newer">Newer</option>
                <option value="width">Width</option>
                <option value="height">Height</option>
                <option value="likes">Likes</option>
                </SelectStyle>
            </FormStyle>
            </SearchBarStyle>
            <ImageGridStyle>
            { filterBySearch && filterBySearch.map((image: SavedImg) => {                
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
                                <DeleteOutlineOutlinedIcon onClick={ () => handleDelete(image) } />
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
                        <span>{image.likes} ❤️</span>
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
        </>
    )
}

export default SearchResults;