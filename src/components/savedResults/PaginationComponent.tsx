import styled from "styled-components";
import { MdFirstPage } from "react-icons/md";
import { MdLastPage } from "react-icons/md";
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { SavedImg } from "../../helpers/interfaces";
import { setPageNavigate } from "../../helpers/pageFunctions";
import { useLocation, useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";

interface PaginationComponentProps {
    filterBySearch: SavedImg[];
    currentPage: number;
    setPage: Dispatch<SetStateAction<number>>;
    imagesPerPage: number;
}

const PaginationComponent = ({
    filterBySearch,
    currentPage,
    setPage,
    imagesPerPage
}: PaginationComponentProps) => {

    const currentPath = useLocation();
    const navigate = useNavigate();

    const totalPages = Math.ceil(filterBySearch.length / imagesPerPage);

    const handlePageChange = (e: React.MouseEvent<HTMLButtonElement>, pageNumber: number) => {
        e.preventDefault();
        e.stopPropagation();
        setPage(pageNumber);
        navigate(setPageNavigate(currentPath.pathname, pageNumber));
    }

    const renderPageNumbers = () => {
        const pagesArray = Array.from(Array(totalPages), (_, index) => index + 1 );
        let startPage = currentPage - 1;
        let endPage = currentPage + 1;

        if(startPage <= 1) {
            startPage = 1;
            endPage = Math.min(startPage + 2, totalPages);
        }

        if(endPage >= totalPages) {
            endPage = totalPages;
            startPage = Math.max(endPage - 2, 1);
        }

        return pagesArray.slice(startPage - 1, endPage);
    }

    return (
        <Pagination>
            {
                filterBySearch.length > 15 &&
                <>
                    <PaginationButton type="button" className={currentPage === 1 ? "disabled" : ""} disabled={currentPage === 1} onClick={(e) => handlePageChange(e, 1)}>
                        <MdFirstPage />
                    </PaginationButton>
                    <PaginationButton type="button" className={currentPage === 1 ? "disabled" : ""} disabled={currentPage === 1} onClick={(e) => handlePageChange(e, currentPage - 1)}>
                        <IoMdArrowDropleft />
                    </PaginationButton>
                    {renderPageNumbers().map((pageNumber) => (
                        <PaginationButton 
                            type="button"
                            key={pageNumber} 
                            onClick={(e) => handlePageChange(e, pageNumber)}
                            className={pageNumber === currentPage ? 'active' : ""}
                        >
                            { pageNumber }
                        </PaginationButton>
                    ))}
                    <PaginationButton type="button" className={currentPage === totalPages ? "disabled" : ""} disabled={currentPage === totalPages} onClick={(e) => handlePageChange(e, currentPage + 1)}>
                        <IoMdArrowDropright />
                    </PaginationButton>
                    <PaginationButton type="button" className={currentPage === totalPages ? "disabled" : ""} disabled={currentPage === totalPages} onClick={(e) => handlePageChange(e, totalPages)}>
                        <MdLastPage />
                    </PaginationButton>
                </>
            }
        </Pagination>
    )
};

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 5rem;

    @media only screen and (max-width: 700px) {
        justify-content: space-between;
        gap: unset;
        margin: 0 1.5rem;
        margin-bottom: 5rem;
    }
`;

const PaginationButton = styled.button`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0.5rem 0.75rem;
    aspect-ratio: 16/9;
    border-radius: 0.25rem;
    border: unset;
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.searchBarBg};
    filter: drop-shadow(1px 1px 1.2px rgb(0 0 0 / 0.6)) opacity(100%);

    &.active {
        color: black;
        font-weight: 800;
        background-color: #0fe10f;
    }

    &.disabled {
        filter: drop-shadow(1px 1px 1.2px rgb(0 0 0 / 0.2)) opacity(50%);
    }
`;

export default PaginationComponent;