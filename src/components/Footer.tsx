import styled from "styled-components";

import linked from '../assets/linked.svg';
import gh from '../assets/gh.svg';

const Footer = () => {
  return (
    <>
      <FooterStyle>
        <SocialText href="https://github.com/init1-dev" target="_blank" rel="noopener noreferrer">© 2024 - in1t.dev</SocialText>
        <SocialStyle>
          <Link href="https://www.linkedin.com/in/in1t-jorge-guillen/" target="_blank" rel="noopener noreferrer">
            <SocialImg src={linked} alt="" />
          </Link>
          <Link href="https://github.com/init1-dev/react-image-search-app" target="_blank" rel="noopener noreferrer">
            <SocialImg src={gh} alt="" />
          </Link>
        </SocialStyle>
      </FooterStyle>
    </>
  );
}

const FooterStyle = styled.footer`
  display: flex;
  gap: 2.5rem;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  padding: 0.6rem 2rem 0.6rem 2rem;
  background-color: ${({ theme }) => theme.header};
  font-size: 12px;
  line-height: 18px;

  left: 0;
  bottom: 0;
  width: calc(100% - 4rem);

  box-shadow: rgb(0 0 0 / 40%) 0px 0px 5px;

  a:hover {
    color: blueviolet;
    transition: all ease 0.3s;
    cursor: pointer;
  }
`;

const SocialStyle = styled.div`
  display: flex;
  width: 50%;
  justify-content: flex-end;
  gap: 2rem
`;

const Link = styled.a`
  display: flex;
`;

const SocialText = styled.a`
  color: ${({ theme }) => theme.footerText};
  text-decoration: none;
`

const SocialImg = styled.img`
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`

export default Footer;
