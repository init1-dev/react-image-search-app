import { Chip } from "@mui/material";
import styled from "styled-components";
import { SavedTags } from "../../helpers/interfaces";

interface TagsProps {
    tag: SavedTags;
}

const TagComponent = ({
    tag
}: TagsProps) => {
    

    return (
        <StyledChip label={"#" + tag.name} />
    )
}

const StyledChip = styled(Chip)`
    &.MuiChip-root {
        font-size: 15px;
        font-weight: 600;
        background-color: ${({ theme }) => theme.searchBarBg};
        color: ${({ theme }) => theme.text};
        border: 0.1em solid transparent;
        cursor: pointer;
    }

    &.MuiChip-root:hover {
        background-color: ${({ theme }) => theme.header};
        color: ${({ theme }) => theme.text};
        border: 0.1em solid ${({ theme }) => theme.body};
    }

    /* &.MuiChip-root:focus {
        background-color: #FFF;
        color: #02242D;
        border: 0.1em solid #02242D;
    } */
`;

export default TagComponent;