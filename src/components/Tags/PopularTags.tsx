import styled from "styled-components";
import { SavedTags } from "../../helpers/interfaces";
import TagComponent from "./TagComponent";

interface PopularTagsProps {
    tags: SavedTags[];
}

const PopularTags = ({
    tags
}: PopularTagsProps) => {
    

    return (
        <TagsContainer>
            Most popular tags:
            {
                tags && tags.map((tag, i) => {
                    return <TagComponent key={i} tag={tag} />
                })
            }
        </TagsContainer>
    )
}

export const TagsContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
`;

export default PopularTags;