import { useSelector } from "react-redux";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

import { useAppDispatch } from "../hooks/store";
import { deletePhoto, editDescription, searchByTerm } from '../store/searchResults/searchSlice';
import { SavedImg, State } from "../helpers/interfaces";
import { FormEvent, useState } from "react";

import { saveAs } from 'file-saver';
import { Button, ButtonContainer, FormStyle, ImageContainerStyle, ImageGridStyle, ImageItemStyle, SearchBarStyle, SearchInputStyle, SectionStyle, SelectStyle } from "../css/SavedResults";
import Tooltip from "./Tooltip";
import EditDescriptionModal from "./EditDescriptionModal";

function SearchResults() {
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<SavedImg | null>(null);
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

  const handleEditDescription = (id: string) => {
    setIsModalOpen(true);
    setCurrentImage(id);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveDescription = (id: string, newDescription: string) => {
    dispatch(editDescription({ id, newDescription }))
  };

  const filterBySearch = getOrderedPhotos(getFilteredPhotos(saved, query), orderBy);

  function handleSearchSubmit(e: FormEvent<HTMLFormElement>) {    
    e.preventDefault();
    dispatch(searchByTerm(searchInput))
  }  

  const handleDownload = (url: string, description: string) => {
    saveAs(
      url,
      `${description}.jpg`
    );
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
                        loading="lazy"
                    />
                    <ButtonContainer>
                      <Button onClick={ () => dispatch(deletePhoto(image.id)) }>
                        <Tooltip text={'Delete image from saved'}>
                          <DeleteOutlineOutlinedIcon />
                        </Tooltip>
                      </Button>
                      <Button onClick={ () => (handleDownload(image.src_full, image.id)) }>
                      <Tooltip text={'Download image'}>
                        <FileDownloadOutlinedIcon />
                      </Tooltip>
                      </Button>
                      <Button>
                        <Tooltip text={'Get info'}>
                          <InfoOutlinedIcon />
                        </Tooltip> 
                      </Button>
                      <Button onClick={ () => handleEditDescription(image.id) }>
                        <Tooltip text={'Edit description'}>
                          <EditNoteOutlinedIcon />
                        </Tooltip>
                      </Button>
                      <span>{image.likes} ❤️</span>
                      <span>{` ${image.description.substring(0,10).toUpperCase()}`}</span>
                      <div>
                        <span>{`{ w: ${image.width}`}</span>
                        <span>{` - h: ${image.height} }`}</span>
                        <span>{` -> ${image.created_at}`}</span>
                      </div>
                    </ButtonContainer>
              </ImageContainerStyle>
            )
          })}
        </ImageGridStyle>
      </SectionStyle>
      <EditDescriptionModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={(description: string) => handleSaveDescription(currentImage, description)} />
    </>
  )
}

export default SearchResults;