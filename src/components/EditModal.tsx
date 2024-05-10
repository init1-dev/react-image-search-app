import { useEffect, useState } from 'react';
import { EditModalProps } from '../helpers/interfaces';
import { Dialog, DialogContent, TextField, Button } from '@mui/material';
import HeightOutlinedIcon from '@mui/icons-material/HeightOutlined';
import SettingsEthernetOutlinedIcon from '@mui/icons-material/SettingsEthernetOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
// import styled from "styled-components";

const EditModal = ({ open, onClose, onSave, image }: EditModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(image.description);

  useEffect(() => {    
    setEditedDescription(image.description);
  }, [image.description]);
  
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveDescription = () => {
    onSave(editedDescription);
    handleEditToggle();
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedDescription(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSaveDescription();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <DialogContent>
        <img src={image.src_regular} 
            alt="Imagen" 
            style={{ width: '100%', height: '100%', maxHeight: '70vh', objectFit: 'contain', marginBottom: '1rem' }} />
        {isEditing ? (
          <TextField
            value={editedDescription}
            onChange={handleDescriptionChange}
            fullWidth
            multiline
            autoFocus
            id="standard-basic" variant="standard"
            onKeyDown={handleKeyDown}
          />
        ) : (
          <span>Desc: <strong>{editedDescription.substring(0,20)}</strong></span>
        )}
        <div style={{display:'flex', alignItems:'center', margin: '0.5rem 0 1rem 0'}}>
          <span style={{display:'flex', alignItems:'center', marginRight: '1rem'}}>
            <SettingsEthernetOutlinedIcon style={{marginRight: '0.5rem'}}/>
            <strong>{`${image.width}`}</strong>
          </span>
          <span style={{display:'flex', alignItems:'center', marginRight: '1rem'}}>
            <HeightOutlinedIcon style={{marginRight: '0.5rem'}}/>
            <strong>{`${image.height}`}</strong>
          </span>
          <span style={{display:'flex', alignItems:'center', marginRight: '1rem'}}>
            <FavoriteBorderOutlinedIcon style={{marginRight: '0.5rem'}}/>
            <strong>{`${image.likes}`}</strong>
          </span>
        </div>
        <div>
          {isEditing ? (
            <Button variant="contained" onClick={handleSaveDescription}>Guardar</Button>
          ) : (
            <Button variant="contained" onClick={handleEditToggle}>Editar descripción</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;