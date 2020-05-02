import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Article } from './BlogPost';

const lightUp = keyframes`
    from {
        opacity: 0.3;
    } to {
        opacity: 1;
    }
`;

const Container = styled(Article)`
    svg {
        animation: ${lightUp} 0.7s ease-in-out infinite alternate-reverse;
        width: 100%;
        fill: ${({ theme }) => theme.placeholder};
    }
`;

const TagContainer = styled.div`
    animation: ${lightUp} 0.7s ease-in-out infinite alternate-reverse;
    margin: 0.3rem;
    svg {
        fill: ${({ theme }) => theme.placeholder};
    }
`;

const DashboardContainer = styled(TagContainer)``;

const HeaderContainer = styled(TagContainer)`
    text-align: center;
`;

const Placeholder = ({ placeholderFor }) => {
    switch (placeholderFor) {
        case 'blogPost':
            return (
                <Container>
                    <svg width="420" height="175" viewBox="0 0 420 175" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="17" y="16" width="386" height="30" rx="3" />
                        <rect x="17" y="63" width="207" height="15" rx="3" />
                        <rect x="17" y="142" width="386" height="15" rx="3" />
                        <rect x="17" y="95" width="62" height="10" rx="3" />
                    </svg>
                </Container>
            );
        case 'tag':
            return (
                <TagContainer>
                    <svg width="60" height="30" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="60" height="30" rx="3"/>
                    </svg>
                </TagContainer>
            );
        case 'dashboard':
            return (
                <DashboardContainer>
                    <svg width="100%" height="100%" viewBox="0 0 386 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="386" height="25" rx="3" />
                    </svg>
                </DashboardContainer>
            );
        case 'profile':
            return (
                <HeaderContainer>
                    <svg width="100%" height="120" viewBox="0 0 491 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="163" cy="67" r="50" />
                        <rect x="240" y="57" width="138" height="30" rx="3" />
                    </svg>
                </HeaderContainer>
            )
        default:
            return null;
    }
}

export default Placeholder;