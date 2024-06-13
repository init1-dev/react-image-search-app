import { Chip } from "@mui/material";
import styled from "styled-components";
import { SavedTags } from "../../helpers/interfaces";
import { Dispatch, SetStateAction } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { resetSearchTerm, savedQuery } from "../../store/searchResults/searchSlice";
import { useNavigate } from "react-router-dom";
import { appName } from "../../Routes";

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
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const query: string = useAppSelector(savedQuery);
    
    const HandleTag = (tagName: string) => {
        if(query !== ""){
            navigate(`${appName}/saved/1`)
            dispatch(resetSearchTerm());
        }
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
        transition: unset;
    }

    &.MuiChip-root:hover {
        background-color: ${({ theme }) => theme.header};
        color: ${({ theme }) => theme.text};
        border: 0.1em solid ${({ theme }) => theme.body};
    }

    &.active {
        background-color: ${({ theme }) => theme.activeElement };
    }
`;

export default TagComponent;