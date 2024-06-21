import { styled as styledMui, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { InputBase, Paper } from '@mui/material';

interface SearchComponentProps {
    placeholder: string;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    searchInput: string;
    setSearchInput: Dispatch<SetStateAction<string>>;
}

const SearchComponent = ({
    placeholder,
    handleChange,
    searchInput,
    setSearchInput
}: SearchComponentProps) => {
    const handleClearInput = () => {
        setSearchInput('');
        handleChange({currentTarget: {value: ''}} as ChangeEvent<HTMLInputElement>);
    };

    return (
        <StyledSearch>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <InputBox elevation={2}>
                <StyledInputBase
                    value={searchInput}
                    placeholder={ placeholder }
                    onChange={ (e) => {handleChange(e) }}
                    inputProps={{ 'aria-label': 'search' }}
                    endAdornment={
                        searchInput && (
                            <ClearIconWrapper onClick={() => handleClearInput()}>
                                <ClearIcon />
                            </ClearIconWrapper>
                        )
                    }
                />
            </InputBox>
        </StyledSearch>
    );
}

const InputBox = styledMui(Paper)(() => ({
    color: 'inherit'
}));

const StyledSearch = styledMui('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styledMui('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const ClearIconWrapper = styledMui('div')(({ theme }) => ({
    display: 'flex',
    position: 'absolute',
    right: theme.spacing(2),
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    color: 'inherit',
}));

const StyledInputBase = styledMui(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`
    },
}));

export default SearchComponent;