import styled from "styled-components";

export const FooterStyle = styled.footer`
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

    a {
        cursor: pointer;
        transition: transform 0.2s ease;

        &:hover {
            transform: scale(1.1);
        }
    }
`;

export const SocialStyle = styled.div`
    display: flex;
    width: 50%;
    justify-content: flex-end;
    gap: 2rem
`;

export const Link = styled.a`
    display: flex;
`;

export const SocialText = styled.a`
    color: ${({ theme }) => theme.footerText};
    text-decoration: none;
`;

export const SocialImg = styled.img`
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.1);
    }
`;