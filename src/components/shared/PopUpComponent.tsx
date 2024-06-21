import { useEffect, useRef, useState } from "react"
import styled from "styled-components";
import ButtonComponent from "./ButtonComponent";
import { createPortal } from "react-dom";
import { RiSave3Fill } from "react-icons/ri";
import { RiCloseLargeFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";

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
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        if (isShown && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setPosition({ top: rect.bottom, left: rect.left });
        }
    }, [isShown]);

    const popUpMenuContent = (
        <PopUpMenu
            className={`popup-menu ${isShown ? 'shown' : ''}`}
            $position={position}
            // onMouseLeave={() => handleMouseLeave()}
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
                                defaultChecked={selectedCollections.includes(collection)}
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
                            onClick={() => setIsCreating(false)}
                            style={{backgroundColor:'#dc3545'}}
                        >
                            Cancel
                        </OptionButton>
                }

                <OptionButton 
                    onClick={() => handleMouseLeave()}
                    style={{backgroundColor:'#6c757d'}}
                >
                    <RiCloseLargeFill /> Close
                </OptionButton>
            </ButtonContainer>
        </PopUpMenu>
    );

    return (
        <PopUpMenuContainer className="popup-menu-container">
            <div ref={buttonRef}>
                <ButtonComponent
                    onClick={ () => setIsShown(prev => !prev) }
                    Icon={ Icon } 
                    tooltipText={tooltipText}
                />

                { createPortal(popUpMenuContent, document.body) }
            </div>
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

const PopUpMenu = styled.div<{ $position: { top: number, left: number}}>`
    display: flex;
    flex-direction: column;
    position: fixed;
    transform: scale(0);
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
        font-size: 15px;

        @media only screen and (max-width: 700px) {
            font-size: 18px;
        }
    }
`;

const Label = styled.label`
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
`;

const TextInput = styled.input`
    margin-top: 0.8rem;
    /* width: 100%; */
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