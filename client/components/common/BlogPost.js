import React from 'react';
import styled from 'styled-components';
import { StyledLink } from '../ui/Link';
import { Small } from '../ui/Small';
import { device } from '../../globals';

export const Article = styled.article`
    border: 1px solid ${({ theme }) => theme.lightGrey};
    box-sizing: border-box;
    border-radius: 5px;
    padding: 0 1rem;
    margin: 0.9rem;
    flex: ${({ stretch }) => stretch ? '1' : '1 420px'};
    max-width: ${({ stretch }) => stretch ? 'auto' : '420px'};
    display: flex;
    flex-direction: column;
    @media ${device.mobile} {
        margin: 0.9rem 0;
    }
`;

const StyledParagraph = styled.p`
    color: ${({ theme }) => theme.secondaryText};
    margin: 0 0 1.3rem 0;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 90%;
    white-space: nowrap;
`;

const Header = styled.header`
    h3 {
        margin: 0;
        padding: 1.3rem 0;
        transition: 0.2s ease;
    }
    &:hover h3 {
        color: ${({ theme }) => theme.secondaryText};
    }
`;

const Footer = styled.footer`
    margin-top: auto;
`;

const LinkContainer = styled.div`
    border-top: 1px solid ${({ theme }) => theme.lightGrey};
    margin-top: auto;
`;

const FooterLink = styled(StyledLink)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    font-size: 0.85em;
    & svg {
        vertical-align: middle;
        transition: transform 0.2s ease-out;
        z-index: -1;
    }
    &:hover svg {
        transform: translateX(2px);
    }
`;

const BlogPost = ({slug, title, date, body, stretch }) => {
    return (
        <Article stretch={stretch}>
                <Header>
                    <StyledLink href="/post/[slug]" as={`/post/${slug}`}>
                        <h3>{title}</h3>
                    </StyledLink>
                </Header>
                <StyledParagraph>{body}</StyledParagraph>
                <Footer>
                    <Small>{date}</Small>
                    <LinkContainer>
                        <FooterLink blue href={`/post/${slug}`}>
                            <span>Read More</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </FooterLink>
                    </LinkContainer>
                </Footer>
        </Article>
    )
}

export default BlogPost;