import linked from '../../../assets/linked.svg';
import gh from '../../../assets/gh.svg';
import { FooterStyle, Link, SocialImg, SocialStyle, SocialText } from "./FooterStyles";

const Footer = () => {
    return (
        <FooterStyle>
            <SocialText 
                href="https://github.com/init1-dev" 
                target="_blank" 
                rel="noopener noreferrer"
            >
                    © 2024 - in1t.dev
            </SocialText>

            <SocialStyle>
                <Link 
                    href="https://www.linkedin.com/in/in1t-jorge-guillen/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <SocialImg src={linked} alt="" />
                </Link>

                <Link 
                    href="https://github.com/init1-dev/react-image-search-app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <SocialImg src={gh} alt="" />
                </Link>
            </SocialStyle>
        </FooterStyle>
    );
}

export default Footer;
