import styled from "styled-components";
import { SavedTags } from "../../helpers/interfaces";
import TagComponent from "./TagComponent";
import { Dispatch, SetStateAction } from "react";
import { MdFilterAltOff } from "react-icons/md";
import { Tooltip } from "@mui/material";

interface PopularTagsProps {
    tags: SavedTags[];
    activeTag: string;
    setTag: Dispatch<SetStateAction<string>>;
}

const PopularTags = ({
    tags,
    activeTag,
    setTag
}: PopularTagsProps) => {

    const handleTagReset = () => {
        if(activeTag !== "") {
            setTag("");
        }
    };

    return (
        <TagsContainer>
            <p>
                Most popular tags:
            </p>

            <div>
                {
                    tags && tags.map((tag, i) => {
                        return <TagComponent 
                                    key={i} 
                                    tag={tag}
                                    activeTag={activeTag}
                                    setTag={setTag}
                                />
                    })
                }
                <Tooltip title={'Reset filter'}>
                    <ResetTagButton onClick={() => handleTagReset()}>
                        <ResetButton />
                    </ResetTagButton>
                </Tooltip>
            </div>
        </TagsContainer>
    )
}

export const TagsContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;

    @media only screen and (max-width: 700px) {
        flex-direction: column;
    }

    p {
        margin: unset;
        padding: unset;

        @media only screen and (max-width: 700px) {
            margin-bottom: 0.5rem;
        }
    }

    div {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }
`;

const ResetButton = styled(MdFilterAltOff)`

`;

const ResetTagButton = styled.button`
    display: flex;
    align-items: center;
    cursor: pointer;
    color: ${({ theme }) => theme.text};
    margin-left: 1rem;
    background-color: unset;
    border: unset;
    outline: unset;
    border-radius: 0.35rem;
    font-size: 25px;
    padding: 0;

    &:hover {

        ${ResetButton} {
            fill: red;
        }
    }
`;

export default PopularTags;