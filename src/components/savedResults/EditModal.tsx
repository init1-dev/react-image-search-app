import { useEffect, useState } from 'react';
import { EditModalProps } from '../../helpers/interfaces';
import { Dialog, DialogContent, TextField, Button } from '@mui/material';
import HeightOutlinedIcon from '@mui/icons-material/HeightOutlined';
import SettingsEthernetOutlinedIcon from '@mui/icons-material/SettingsEthernetOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import styled from 'styled-components';
import { handleCopyUrl } from '../../helpers/handleCopyUrl';

const EditModal = ({ open, onClose, onSave, image, isEditVisible }: EditModalProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(image.description);

    useEffect(() => {    
        setEditedDescription(image.description);
    }, [image.description]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSaveDescription = () => {
        if(onSave){
            onSave(editedDescription);
            handleEditToggle();
        }
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

    const isEditingButton = isEditing
        ? <Button variant="contained" onClick={handleSaveDescription}>SAVE</Button> 
        : <Button variant="contained" onClick={handleEditToggle}>EDIT DESC</Button>

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
            <DialogContentModal>
                <img src={image.src_regular} 
                    alt="Imagen" 
                    style={{ width: '100%', height: '100%', maxHeight: '70vh', objectFit: 'contain', marginBottom: '1rem' }} 
                />

                {isEditing ? (
                    <ModalTextField
                        value={editedDescription}
                        onChange={handleDescriptionChange}
                        fullWidth
                        multiline
                        autoFocus
                        id="standard-basic" variant="standard"
                        onKeyDown={handleKeyDown}
                    />
                ) : (
                    <span>
                        Desc: <strong>
                                { editedDescription.length > 25
                                    ? editedDescription.substring(0,25) + "..."
                                    : editedDescription 
                                }
                            </strong>
                    </span>
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
                    <Button 
                        onClick={ () => handleCopyUrl(image.src_regular) } 
                        style={{marginRight:"1rem"}} 
                        variant="contained"
                    >
                        COPY URL
                    </Button>
                    { isEditVisible
                        && isEditingButton }
                </div>
            </DialogContentModal>
        </Dialog>
    );
};

const DialogContentModal = styled(DialogContent)`
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.searchBarBg};
`;

const ModalTextField = styled(TextField)`
    textarea {
        color: ${({ theme }) => theme.text};
        background-color: ${({ theme }) => theme.searchBarBg};
    }
`;

export default EditModal;