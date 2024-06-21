import Masonry from '@mui/lab/Masonry';
import { Tooltip } from "@mui/material";
import { SavedImg } from '../../helpers/interfaces';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { MdContentCopy } from "react-icons/md";
import ButtonComponent from '../shared/ButtonComponent';
import styled from 'styled-components';

interface ImagesMasonryProps {
    pageItems: SavedImg[];
    handleImageModal: (image: SavedImg) => void;
    handleDelete: (image: SavedImg, pageImages: number) => void;
    handleDownload: (url: string, description: string) => void;
    handleCopyUrl: (url: string) => void;
}

const ImagesMasonry = ({
    pageItems,
    handleImageModal,
    handleDelete,
    handleDownload,
    handleCopyUrl
}: ImagesMasonryProps) => {
    return (
        <Masonry
            columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            spacing={3}
            style={{overflow:'hidden', display:'flex'}}
        >
        { pageItems.map((image: SavedImg) => {
            return (
            <ImageContainerStyle key={image.id}>
                <Tooltip title="Click to details" followCursor>
                    <ImageItemStyle
                        src={image.src_preview}
                        alt={image.description}
                        onClick={() => handleImageModal(image)}
                    />
                </Tooltip>
                
                <ButtonContainer>
                    <ButtonComponent
                        onClick={ () => handleDelete(image, pageItems.length) }
                        Icon={DeleteOutlineOutlinedIcon} 
                        tooltipText={"Remove from saved"}
                    />

                    <ButtonComponent
                        onClick={ () => (handleDownload(image.src_full, image.id)) }
                        Icon={FileDownloadOutlinedIcon} 
                        tooltipText={"Download image"}
                    />

                    <ButtonComponent
                        onClick={ () => (handleCopyUrl(image.src_regular)) }
                        Icon={CopyUrlButton} 
                        tooltipText={"Copy url"}
                    />

                    <ButtonComponent
                        onClick={ () => handleImageModal(image) }
                        Icon={InfoOutlinedIcon} 
                        tooltipText={"Get info"}
                    />
                    
                    <span className="shadow">{image.likes} ❤️</span>
                </ButtonContainer>
            </ImageContainerStyle>
            )
        })}
        </Masonry >
    );
}

const CopyUrlButton = styled(MdContentCopy)`
    font-size: 18px;
`;

export const ImageItemStyle = styled.img`
    width: 100%;
    display: block;
    border-radius: 5px;
    filter: drop-shadow(1px 1px 1.2px rgb(0 0 0 / 0.3));
    cursor: zoom-in;
    transition: all 0.3s ease;
`;

export const ButtonContainer = styled.div`
    opacity: 0;
    padding: 0.35rem 0;
    display: inline-flex;
    position: absolute;
    bottom: 0rem;
    left: 0rem;
    width: 100%;
    border-radius: 0 0 0.3rem 0.3rem;
    background-color: rgba(55, 62, 73, 0.6);
    transition: opacity 0.2s ease;

    span {
        color: white;
        display: flex;
        align-items: center;
        margin-left: 0.5rem;
    }

    @media only screen and (max-width: 1024px) {
        opacity: 1;
    }
`;

export const ImageContainerStyle = styled.div`
    position: relative;
    display: inline-block;
    margin-bottom: 15px;
    width: 100%;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.02);

        ${ImageItemStyle} {
            box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
        }

        ${ButtonContainer} {
            opacity: 1;
        }
    }

    @media only screen and (max-width: 1024px) {
        &:hover {
            transform: unset;

            ${ImageItemStyle} {
                box-shadow: unset;
            }
        }
    }
`;

export default ImagesMasonry;