import styled from "styled-components";
import { SelectStyle } from "../../css/SavedResults";
import { Dispatch, SetStateAction, forwardRef } from "react";

interface FiltersComponentProps {
    orderBy: string;
    setOrderBy: Dispatch<SetStateAction<string>>;
    imagesPerPage: number;
    handleImagesPerPage: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FiltersComponent = forwardRef<HTMLDivElement, FiltersComponentProps>(({
    orderBy,
    setOrderBy,
    imagesPerPage,
    handleImagesPerPage
}, ref) => {
    return (
        <FiltersContainer ref={ref} tabIndex={-1}>
            <FilterGroup>
                <label htmlFor="itemsSelect">
                    <small>Sort by:</small>
                </label>

                <SelectStyle 
                    id="orderSelect"
                    value={orderBy}
                    onChange={ (e) => setOrderBy(e.target.value) }
                >
                    { filters.map((filter, i) => {
                        return  <option key={i} value={filter.value} >
                                    {filter.text}
                                </option>
                    }) }
                </SelectStyle>
            </FilterGroup>

            <FilterGroup>
                <label htmlFor="itemsSelect">
                    <small>Images/page:</small>
                </label>
                    
                <SelectStyle 
                    id="itemsSelect" 
                    value={imagesPerPage} 
                    onChange={ (e) => handleImagesPerPage(e) }
                >
                    { PageOptions.map((option, i) => {
                        return  <option key={i} value={option} >
                                    {option}
                                </option>
                    }) }
                </SelectStyle>
            </FilterGroup>
        </FiltersContainer>
    );
});

const FiltersContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const FilterGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    label {
        color: ${({ theme }) => theme.text};
    }
`;

const filters = [
    {
        value:'older',
        text: 'Older'
    },
    {
        value:'newer',
        text: 'Newer'
    },
    {
        value:'width',
        text: 'Width'
    },
    {
        value:'height',
        text: 'Height'
    },
    {
        value:'likes',
        text: 'Likes'
    }
];

const PageOptions = [
    10, 15, 20
];

export default FiltersComponent;