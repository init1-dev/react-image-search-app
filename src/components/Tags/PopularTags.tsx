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
            <p>
                Most popular tags:
            </p>

            <div>
                {
                    tags && tags.map((tag, i) => {
                        return <TagComponent key={i} tag={tag} />
                    })
                }
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
    margin-bottom: 1rem;

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

export default PopularTags;