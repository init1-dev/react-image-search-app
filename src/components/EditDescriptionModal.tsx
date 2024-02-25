import { useState } from 'react';
import styled from 'styled-components';

const EditDescriptionModal = ({ isOpen, onClose, onSave }) => {
  const [description, setDescription] = useState('');

  const handleChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = () => {
    onSave(description);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <ModalOverlay>
          <ModalContent>
            <Container>
                <Title>Edit Description</Title>
                <Text value={description} onChange={handleChange} />
            </Container>
            <Container>
                <Save onClick={handleSubmit}>Save</Save>
                <Cancel onClick={onClose}>Cancel</Cancel>
            </Container>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
    background-color: ${({ theme }) => theme.body};
    border-radius: 8px;
    margin: 1rem;
`;

const Title = styled.h2`
    text-align: center;
    margin: 0 0 1rem 0;
    font-size: 2rem;

    @media only screen and (max-width: 700px) {
        font-size: 1.5rem;
    }
`;

const Container = styled.div`
    display: block;
    padding: 2rem 2rem 1rem 2rem;

    &:last-child {
        padding: 0rem 2rem 1rem 2rem;
    }
    @media only screen and (max-width: 700px) {
        padding: 1rem 1.4rem 1rem 1rem;

        &:last-child {
            padding: 0rem 1rem 1rem 1rem;
        }
    }
`;

const Text = styled.textarea`
    font-size: 2rem;
    border-radius: 0.5rem;
    width: 100%;
`;

const Save = styled.button`
    padding: 0.5rem;
    border-radius: 0.5rem;
    margin-right: 0.5rem;
    font-size: 1.5rem;
    
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

    @media only screen and (max-width: 700px) {
        font-size: 1rem;
    }
`;

const Cancel = styled.button`
    padding: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    font-size: 1.5rem;

    @media only screen and (max-width: 700px) {
        font-size: 1rem;
    }
`;

export default EditDescriptionModal;
