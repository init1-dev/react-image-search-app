import { Tooltip } from "@mui/material";
import { useState } from "react"
import styled from "styled-components";

interface PopUpProps {
    // onClick: () => void;
    Icon: any;
    tooltipText: string;
}

const PopUpComponent = ({
    // onClick,
    Icon,
    tooltipText
}: PopUpProps) => {
    const [isShown, setIsShown] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [newCollectionName, setNewCollectionName] = useState('');
    const [selectedCollections, setSelectedCollections] = useState<string[]>([]);

    const handleCreateCollection = () => {
        if(isCreating) {
            selectedCollections.forEach(element => {
                console.log(element);
            });
        } else {
            setIsCreating(true);
        }
    };

    const handleMouseLeave = () => {
        setIsShown(false);
        setIsCreating(false);
        setNewCollectionName('');
        setSelectedCollections([]);
    };

    const handleSelectedCollections = (collection: string) => {
        setSelectedCollections(prev => {
            if(prev.includes(collection)){
                console.log('existe, la quito');
                return prev.filter(item => item !== collection);
            } else {
                console.log('no existe, la añado');
                return [...prev, collection];
            }
        });
    };

    return (
        <PopUpMenuContainer className="popup-menu-container">
            <Button onClick={() => setIsShown(prev => !prev)}>
                <Tooltip title={tooltipText}>
                    <span>
                        <Icon />
                    </span>
                </Tooltip>
            </Button>

            <PopUpMenu
                className={`popup-menu ${isShown ? 'shown' : ''}`}
                onMouseLeave={() => handleMouseLeave()}
            >
                <small>Add to collection:</small>
                <CollectionsList>
                    {
                        collections.map((collection, i) => (
                            <li key={i}>
                                <CheckBoxInput 
                                    type="checkbox" 
                                    name={collection} 
                                    id={collection} 
                                    checked={selectedCollections.includes(collection)}
                                    onInputCapture={() => handleSelectedCollections(collection)}
                                />
                                <label htmlFor={collection}>
                                    {collection}
                                </label>
                            </li>
                        ))
                    }
                </CollectionsList>

                {
                    isCreating && 
                    <label htmlFor="new-collection">
                        <input 
                            type="text" 
                            name="new-collection" 
                            id="new-collection" 
                            value={newCollectionName}
                            onChange={(e) => setNewCollectionName(e.target.value)}
                        />
                    </label>
                }
                

                <ButtonContainer>
                    { 
                        isCreating
                            ?   <CreateButton onClick={() => handleCreateCollection()}>
                                    Save
                                </CreateButton>
                            :   <CreateButton onClick={() => handleCreateCollection()}>
                                    New collection
                                </CreateButton>
                    }

                    <CreateButton onClick={() => handleMouseLeave()}>
                        Add
                    </CreateButton>

                    <CreateButton onClick={() => handleMouseLeave()}>
                        Close
                    </CreateButton>
                </ButtonContainer>
            </PopUpMenu>
        </PopUpMenuContainer>
    )
}

const collections = [
    'landscapes',
    'buildings',
    'forest'
]

const PopUpMenuContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
`;

const PopUpMenu = styled.div`
    position: absolute;
    z-index: 1000;
    transform: scale(0);
    transform-origin: top left;
    
    width: auto;
    margin-top: 2rem;
    padding: 1rem;
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.themeButtonBg};
    border-radius: 0.5rem;
    transition: transform 0.2s;
    filter: drop-shadow(1px 1px 1.2px rgb(0 0 0 / 0.6));
    
    &.shown {
        transform: scale(1);
    }
`;

const CollectionsList = styled.ul`
    list-style: none;
    margin: 0.5rem 0 0 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
`;

const CheckBoxInput = styled.input`
    margin-right: 0.5rem;
`;

const ButtonContainer = styled.div`
    display: inline-flex;
    gap: 0.5rem;
`;

export const Button = styled.button`
    font-size: 20px;
    padding: unset;
    background-color: unset;
    border: unset;
    margin-right: 0rem;
    cursor: pointer;
    filter: drop-shadow(1px 1px 1.2px rgb(0 0 0 / 0.6));

    &:focus, &:focus-visible {
        outline: unset;
    }

    span svg {
        color: white;

        &:hover {
            color: #0fe10f;
        }
    }
`;

const CreateButton = styled.button`
    margin-top: 1rem;
`;

export default PopUpComponent;