import { useSelector } from "react-redux";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

import { useAppDispatch } from "../hooks/store";
import { deletePhoto, searchByTerm } from '../store/searchResults/searchSlice';
import { SavedImg, State } from "../helpers/interfaces";
import { FormEvent, useState } from "react";

import { saveAs } from 'file-saver';
import { Button, ButtonContainer, FormStyle, ImageContainerStyle, ImageGridStyle, ImageItemStyle, SearchBarStyle, SearchInputStyle, SectionStyle, SelectStyle } from "../css/SavedResults";

function SearchResults() {
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState('');
  const [orderBy, setOrderBy] = useState('')
  const saved = useSelector((state: State) => state.saved.images)
  const query = useSelector((state: State) => state.saved.query)

  const getFilteredPhotos = (images:SavedImg[] , searchTerm: string) => {
    const filtered = images.filter(image => image.description?.toLowerCase().includes(searchTerm.toLowerCase()));
    return filtered;
  }

  const getOrderedPhotos = (images: SavedImg[], filter: string) => {    
    if (filter === 'newer') {
      return images.sort((prevPhoto: SavedImg, nextPhoto: SavedImg) => nextPhoto['created_at'] - prevPhoto['created_at']).reverse()
    }
    return images.sort((prevPhoto: SavedImg, nextPhoto: SavedImg) => nextPhoto[filter] - prevPhoto[filter])
}

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
                        <DeleteOutlineOutlinedIcon />
                      </Button>
                      <Button onClick={ () => (handleDownload(image.src_full, image.id)) }>
                        <FileDownloadOutlinedIcon />
                      </Button>
                      <Button>
                        <InfoOutlinedIcon />
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
    </>
  )
}

export default SearchResults;