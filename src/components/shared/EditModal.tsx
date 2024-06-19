import { useEffect, useState } from 'react';
import { EditModalProps } from '../../helpers/interfaces';
import { Dialog, DialogContent, TextField, Button, Tooltip, IconButton, AppBar, Toolbar, Typography, Slide } from '@mui/material';
import { TbArrowAutofitHeight, TbArrowAutofitWidth } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import styled from 'styled-components';
import { handleCopyUrl } from '../../helpers/savedImagesFunctions';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { TransitionProps } from '@mui/material/transitions';

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

    const handleClose = () => {
        onClose();
        setIsEditing(false);
        setEditedDescription(image.description);
    };

    const isEditingButton = isEditing
        ? <StyledButton variant="contained" color="success" style={{marginRight:"1rem"}} onClick={handleSaveDescription}>SAVE</StyledButton> 
        : <StyledButton variant="contained" style={{marginRight:"1rem"}} onClick={handleEditToggle}>EDIT DESC</StyledButton>

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xl" fullScreen TransitionComponent={Transition}>
            <StyledAppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                        >
                        <CloseIcon />
                    </IconButton>

                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Image details
                    </Typography>
                </Toolbar>
            </StyledAppBar>

            <DialogContentModal>
                <img src={image.src_regular} 
                    alt="Imagen" 
                    style={{ width: '100%', height: '100%', maxHeight: '70vh', objectFit: 'contain', marginBottom: '1rem' }}
                />

                <OptionsBox>
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
                            Desc:
                            <Tooltip title={editedDescription} followCursor>
                                <strong>
                                    { editedDescription.length > 25
                                        ? " " + editedDescription.substring(0,25) + "..."
                                        : " " + editedDescription 
                                    }
                                </strong>
                            </Tooltip>
                        </span>
                    )}

                    <div style={{display:'flex', alignItems:'center', margin: '0.5rem 0 1rem 0'}}>
                        <span style={{display:'flex', alignItems:'center', marginRight: '1rem'}}>
                            <Tooltip title="Width" followCursor>
                                <StyledSpan>
                                    <TbArrowAutofitWidth style={{marginRight: '0.5rem'}}/>
                                </StyledSpan>
                            </Tooltip>
                            <strong>{`${image.width}`}<small>px</small></strong>
                        </span>

                        <span style={{display:'flex', alignItems:'center', marginRight: '1rem'}}>
                            <Tooltip title="Height" followCursor>
                                <StyledSpan>
                                    <TbArrowAutofitHeight style={{marginRight: '0.5rem'}}/>
                                </StyledSpan>
                            </Tooltip>
                            <strong>{`${image.height}`}<small>px</small></strong>
                        </span>

                        <span style={{display:'flex', alignItems:'center', marginRight: '1rem'}}>
                            <Tooltip title="Likes" followCursor>
                                <StyledSpan>
                                    <FaHeart style={{marginRight: '0.5rem', fill:"red"}}/>
                                </StyledSpan>
                            </Tooltip>
                            <strong>{`${image.likes}`}</strong>
                        </span>
                    </div>

                    <TagsContainer>
                        { 
                            image.tags && image.tags.map((tag, i) => {
                                return (
                                    <Tag key={i}>#{tag.title}</Tag>
                                );
                            })
                        }
                    </TagsContainer>

                    <ButtonsContainer>
                        <StyledButton 
                            onClick={ () => handleCopyUrl(image.src_regular) } 
                            style={{marginRight:"1rem"}} 
                            variant="contained"
                        >
                            COPY URL
                        </StyledButton>

                        { isEditVisible
                            && isEditingButton }

                        <StyledButton 
                            onClick={handleClose}
                            style={{backgroundColor:'#6c757d', color:'white'}}
                        >
                            CLOSE
                        </StyledButton>
                    </ButtonsContainer>
                </OptionsBox>

            </DialogContentModal>
        </Dialog>
    );
};

const StyledAppBar = styled(AppBar)`
    background-color: ${({ theme }) => theme.header} !important;
`;

const DialogContentModal = styled(DialogContent)`
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.searchBarBg};
    user-select: none;

    img {
        filter: drop-shadow(1.5px 1.5px 3px rgb(0 0 0 / 0.6));
        max-height: unset !important;
        height: calc(100% - 200px) !important;

        /* @media only screen and (max-width: 700px) {
            max-height: 60vh !important;
        } */
    }
`;

const OptionsBox = styled.div`
    position: relative;
    width: 100%;
    margin: 0 auto;
`;

const ModalTextField = styled(TextField)`
    textarea {
        color: ${({ theme }) => theme.text};
        background-color: ${({ theme }) => theme.searchBarBg};
    }
`;

export const TagsContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
`;

export const Tag = styled.p`
    font-family: Plus Jakarta Sans, sans-serif;
    font-size: 0.7em;
    font-weight: 600;
    padding: 0.5rem;
    background-color: ${({ theme }) => theme.themeButtonBg};
    border-radius: 0.5rem;
    width: max-content;
    margin: 0;
    color: ${({ theme }) => theme.text};
    text-transform: uppercase;
    cursor: pointer;
`;

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    text-align: left;
`;

const StyledButton = styled(Button)`
    width: 100%;
`;

const StyledSpan = styled.span`
    display: flex;
`;

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default EditModal;