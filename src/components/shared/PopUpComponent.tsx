import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components";
import ButtonComponent from "./ButtonComponent";
import { createPortal } from "react-dom";
import { RiSave3Fill, RiCloseLargeFill } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { collections, createCollection, deleteCollection } from "../../store/searchResults/searchSlice";
import { Collection } from "../../helpers/interfaces";

interface PopUpProps {
    // onClick: () => void;
    Icon: any;
    tooltipText: string;
    id: string;
    openPopUpId: string | null;
    setOpenPopUpId: React.Dispatch<React.SetStateAction<string | null>>;
}

const PopUpComponent = ({
    // onClick,
    Icon,
    tooltipText,
    id,
    openPopUpId,
    setOpenPopUpId
}: PopUpProps) => {
    const [isCreating, setIsCreating] = useState(false);
    const [newCollectionName, setNewCollectionName] = useState('');
    const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef<HTMLDivElement>(null);
    const popUpRef = useRef<HTMLDivElement>(null);
    const isOpen = openPopUpId === id;

    const savedCollections = useAppSelector(collections);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setPosition({ top: rect.bottom, left: rect.left });
        }
    }, [isOpen]);

    const handleTogglePopUp = () => {
        if(isOpen){
            setOpenPopUpId(null);
        } else {
            setOpenPopUpId(id);
        }
    };

    const handleCreateCollection = () => {
        if(isCreating) {
            const collection = newCollectionName.trim();
            const notExist = !savedCollections.find(items => items.name === collection);

            if(collection !== '' && notExist){
                const newCollection:Collection = {name: newCollectionName, images: []};
                dispatch(createCollection(newCollection));
                setNewCollectionName('');
                setIsCreating(false);
            }
        } else {
            setIsCreating(true);
        }
    };

    const handleCancel = () => {
        setNewCollectionName('');
        setIsCreating(false);
    };

    const handleDeleteCollection = (name: string) => {
        // dispatch(clearAllCollections());
        dispatch(deleteCollection(name));
    }

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

    const closePopUp = () => {
        setOpenPopUpId(null);
        setIsCreating(false);
        setNewCollectionName('');
        setSelectedCollections([]);
    };

    const handleClickOutside = (event: MouseEvent) => {
        const btnRef = buttonRef.current && !buttonRef.current.contains(event.target as Node);
        const popRef = popUpRef.current && !popUpRef.current.contains(event.target as Node);
        
        if (btnRef && popRef) {
            closePopUp();
        }
    };

    const handleScroll = () => {
        if (isOpen) {
            closePopUp();
        }
    };

    useEffect(() => {
        if(isOpen){
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('scroll', handleScroll);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('scroll', handleScroll);
        };
    }, [isOpen]);

    const popUpMenuContent = (
        <PopUpMenu
            ref={popUpRef}
            className={`popup-menu ${isOpen ? 'shown' : ''}`}
            $position={position}
            $isOpen={isOpen}
        >
            <small>Add to collection:</small>
            <CollectionsList>
                {
                    savedCollections.length > 0
                        ? savedCollections.map(({name}, i) => (
                            <li key={i}>
                                <span>
                                    <CheckBoxInput 
                                        type="checkbox" 
                                        name={name} 
                                        id={name} 
                                        defaultChecked={selectedCollections.includes(name)}
                                        onInputCapture={() => handleSelectedCollections(name)}
                                    />

                                    <label htmlFor={name}>
                                        {name}
                                    </label>
                                </span>

                                <button onClick={() => handleDeleteCollection(name)}>
                                    <RiDeleteBin6Line />
                                </button>
                            </li>
                        ))
                        :   <li>
                                <small style={{color:'#8d8d8d'}}>
                                    Create collections to see them here
                                </small>
                            </li>
                    
                }
            </CollectionsList>

            {
                isCreating && 
                <Label htmlFor="new-collection">
                    <small>Collection name:</small>
                    <TextInput 
                        type="text" 
                        name="new-collection" 
                        id="new-collection" 
                        value={newCollectionName}
                        onChange={(e) => setNewCollectionName(e.target.value)}
                    />
                </Label>
            }

            <ButtonContainer>
                { 
                    isCreating
                        ?   <OptionButton 
                                onClick={() => handleCreateCollection()}
                                style={{backgroundColor:'#28a745'}}
                            >
                                <RiSave3Fill /> Save
                            </OptionButton>

                        :   <OptionButton 
                                onClick={() => handleCreateCollection()}
                                style={{backgroundColor:'#007bff'}}
                            >
                                <FaPlus /> New collection
                            </OptionButton>
                }

                {
                    isCreating &&
                        <OptionButton 
                            onClick={handleCancel}
                            style={{backgroundColor:'#dc3545'}}
                        >
                            Cancel
                        </OptionButton>
                }

                <OptionButton 
                    onClick={closePopUp}
                    style={{backgroundColor:'#6c757d'}}
                >
                    <RiCloseLargeFill /> Close
                </OptionButton>
            </ButtonContainer>
        </PopUpMenu>
    );

    return (
        <PopUpMenuContainer className="popup-menu-container">
            <span ref={buttonRef}>
                <ButtonComponent
                    onClick={handleTogglePopUp}
                    Icon={ Icon } 
                    tooltipText={tooltipText}
                />

                { isOpen && createPortal(popUpMenuContent, document.body) }
            </span>
        </PopUpMenuContainer>
    )
}

const PopUpMenuContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
`;

const PopUpMenu = styled.div<{ $position: { top: number, left: number}, $isOpen: boolean}>`
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
    flex-direction: column;
    position: fixed;
    transform: scale(${({ $isOpen }) => ($isOpen ? 1 : 0)});
    transform-origin: top left;
    top: ${({ $position }) => `${$position.top}px`};
    left: ${({ $position }) => `${$position.left}px`};
    
    margin-top: 0.5rem;
    padding: 1rem;
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.themeButtonBg};
    border-radius: 0.5rem;
    transition: transform 0.2s;
    filter: drop-shadow(1px 1px 1.2px rgb(0 0 0 / 0.6));
    
    &.shown {
        transform: scale(1);
    }

    @media only screen and (max-width: 700px) {
        width: 70%;
        left: 10%;
        right: 10%;
    }
`;

const CollectionsList = styled.ul`
    list-style: none;
    margin: 0.5rem 0 0 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    li {
        display: flex;
        gap: 0.5rem;
        font-size: 15px;
        justify-content: space-between;

        @media only screen and (max-width: 700px) {
            font-size: 18px;
        }
    }

    button {
        padding: 0.2rem 0.35rem;
        border-radius: 0.5rem;
        border: unset;
    }
`;

const Label = styled.label`
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
`;

const TextInput = styled.input`
    margin-top: 0.8rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: unset;
    margin-right: 0.5rem;
    filter: drop-shadow(1px 1px 1.2px rgb(0 0 0 / 0.3));
`;

const CheckBoxInput = styled.input`
    margin-right: 0.5rem;
`;

const ButtonContainer = styled.div`
    margin-top: 1rem;
    display: inline-flex;
    justify-content: space-between;
    gap: 0.5rem;
`;

const OptionButton = styled.button`
    display: flex;
    gap: 0.35em;
    align-items: center;
    color: white;
    text-shadow: 1px 1px 5px rgb(0 0 0 / 0.4);
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: none;
    filter: drop-shadow(1px 1px 1.2px rgb(0 0 0 / 0.6));

    @media only screen and (max-width: 700px) {
        font-size: 18px;
    }
`;

export default PopUpComponent;