import styled from "styled-components";

function Operations() {

  return (
    <>
      <SectionStyle>
        
      </SectionStyle>
    </>
  )
}

const SectionStyle= styled.main`
  background-color: ${({ theme }) => theme.body};
  padding: 1.5rem;
  margin: 6rem 20% 3rem 20%;

  @media only screen and (max-width: 1024px) {
    margin: 5rem 12% 3rem 12%
  }

  @media only screen and (max-width: 700px) {
    margin: 8rem 5% 2.5rem 5%
  }
`;

export default Operations;