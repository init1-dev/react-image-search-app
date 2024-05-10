import { useSelector } from "react-redux";
import { FormEvent, useState } from "react";
import { useAppDispatch } from "../hooks/store";
import { deletePhoto, editDescription, searchByTerm } from '../store/searchResults/searchSlice';
import { SavedImg, SelectedPic, State } from "../helpers/interfaces";

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import Tooltip from "./Tooltip";
import { saveAs } from 'file-saver';
import { Button, ButtonContainer, FormStyle, ImageContainerStyle, ImageGridStyle, ImageItemStyle, SearchBarStyle, SearchInputStyle, SectionStyle, SelectStyle } from "../css/SavedResults";
import EditModal from "./EditModal";
import Toast from "../helpers/alerts/swal";


function SearchResults() {
    const dispatch = useAppDispatch();

    const [searchInput, setSearchInput] = useState('');
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
        return images.sort((prevPhoto: SavedImg, nextPhoto: SavedImg) => nextPhoto['created_at'] - prevPhoto['created_at']).reverse();
        }
        return images.sort((prevPhoto: SavedImg, nextPhoto: SavedImg) => nextPhoto[filter] - prevPhoto[filter]);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveDescription = (id: string, newDescription: string) => {    
        dispatch(editDescription({ id, newDescription }))
    };

    const filterBySearch = getOrderedPhotos(getFilteredPhotos(saved, query), orderBy);

    const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {    
        e.preventDefault();
        dispatch(searchByTerm(searchInput))
    };

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
            <FormStyle onSubmit={ (e) => handleSearchSubmit(e) }>
                <SearchInputStyle type="search" autoComplete="off" name="" id="search-box" placeholder="Busca entre tus fotos.." value={searchInput} onChange={(e) => { setSearchInput(e.target.value) }} />
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
                        src={image.src_regular}
                        width={400}
                        alt={image.description}
                    />
                    <ButtonContainer>
                    <Button>
                        <Tooltip text={'Remove from saved'}>
                        <DeleteOutlineOutlinedIcon onClick={ () => handleDelete(image) } />
                        </Tooltip>
                    </Button>
                    <Button onClick={ () => (handleDownload(image.src_full, image.id)) }>
                    <Tooltip text={'Download image'}>
                        <FileDownloadOutlinedIcon />
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