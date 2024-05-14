import linked from '../../../assets/linked.svg';
import gh from '../../../assets/gh.svg';
import { FooterStyle, Link, SocialImg, SocialStyle, SocialText } from "./FooterStyles";
import { Tooltip } from '@mui/material';

const Footer = () => {
    return (
        <FooterStyle>
            <Tooltip title="My github profile" followCursor>
                <SocialText 
                    href="https://github.com/init1-dev" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                        © 2024 - in1t.dev
                </SocialText>
            </Tooltip>

            <SocialStyle>
                <Tooltip title="My LinkedIn" followCursor>
                    <Link 
                        href="https://www.linkedin.com/in/in1t-jorge-guillen/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <SocialImg src={linked} alt="" />
                    </Link>
                </Tooltip>

                <Tooltip title="This app repository" followCursor>
                    <Link 
                        href="https://github.com/init1-dev/react-image-search-app" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <SocialImg src={gh} alt="" />
                    </Link>
                </Tooltip>
            </SocialStyle>
        </FooterStyle>
    );
}

export default Footer;
