import Masonry from '@mui/lab/Masonry';
import { Tooltip } from "@mui/material";
import { SavedImg } from '../../helpers/interfaces';
import { ButtonContainer, ImageContainerStyle, ImageItemStyle } from '../../css/SavedResults';
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

export default ImagesMasonry;