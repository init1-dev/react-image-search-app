import { Chip } from "@mui/material";
import styled from "styled-components";
import { SavedTags } from "../../helpers/interfaces";
import { Dispatch, SetStateAction } from "react";

interface TagsProps {
    tag: SavedTags;
    activeTag: string;
    setTag: Dispatch<SetStateAction<string>>;
}

const TagComponent = ({
    tag,
    activeTag,
    setTag
}: TagsProps) => {
    
    const HandleTag = (tagName: string) => {
        return activeTag === tagName ? "" : tagName;
    }

    return (
        <StyledChip 
            label={"#" + tag.name} 
            onClick={() => setTag(HandleTag(tag.name))}
            className={activeTag === tag.name ? 'active' : ''}
        />
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

    &.active {
        background-color: #006a88;
    }
`;

export default TagComponent;