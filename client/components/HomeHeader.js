import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import useTags from '../hooks/useTags';
import { TagLink } from './ui/Link';
import { DefaultButton } from './ui/Button';
import Placeholder from './common/Placeholder';
import { device } from '../globals';

const Header = styled.header`
    background: ${({ theme }) => theme.bg};
    border-bottom: 1px solid ${({ theme }) => theme.lightGrey};
    box-sizing: border-box;
    padding: 0.5rem 0;
    display: flex;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 70px;
    position: sticky;
    top: 0;

    @media ${device.mobile} {
        padding: 0.5rem 0;
    }
`;

const Tags = styled.ul`
    display: flex;
    align-items: center;
    list-style-type: none;
    margin: 0 1rem;
    padding: 6rem 0 5rem 0;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;

    @media ${device.mobile} {
        margin: 0 0.6rem;
        padding: 5rem 0;
    }
`;

const RightPaddle = styled(DefaultButton)`
    margin: 0;
    height: 100%;

    &:disabled svg {
        stroke: ${({ theme }) => theme.secondary.hover};
        cursor: not-allowed;
    }
    
    & svg {
        stroke: ${({ theme }) => theme.links};
    }
    
    &:hover:not(:disabled) svg {
        stroke: ${({ theme }) => theme.linksHover};
    }
`;

const LeftPaddle = styled(RightPaddle)``;

const LoadingContainer = styled(Tags)`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-top: 5rem;
    width: 100%;

    @media ${device.mobile} {
        padding-top: 6rem;
    }
`;

const HomeHeader = () => {
    const { tags, loading } = useTags();
    const [ hideRightPaddle, setHideRightPaddle ] = useState(false);
    const [ hideLeftPaddle, setHideLeftPaddle ] = useState(true);
    const nav = useRef();

    const scrollNavRight = () => {
        nav.current.scrollLeft += 100;
    }

    const scrollNavLeft = () => {
        nav.current.scrollLeft -= 100;
    }

    const handleHidePaddle = (e) => {
        const maxScroll = e.target.scrollWidth - e.target.clientWidth;
        if (e.target.scrollLeft >= maxScroll) {
            setHideRightPaddle(true);
        } else if (e.target.scrollLeft <= 0) {
            setHideLeftPaddle(true);
        } else {
            setHideLeftPaddle(false);
            setHideRightPaddle(false);
        }
    }

    return (
        <Header>
            <LeftPaddle disabled={hideLeftPaddle} onClick={scrollNavLeft}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </LeftPaddle>
            {
                loading ?
                <LoadingContainer>
                    <Placeholder placeholderFor='tag' />
                    <Placeholder placeholderFor='tag' />
                    <Placeholder placeholderFor='tag' />
                    <Placeholder placeholderFor='tag' />
                    <Placeholder placeholderFor='tag' />
                    <Placeholder placeholderFor='tag' />
                    <Placeholder placeholderFor='tag' />
                    <Placeholder placeholderFor='tag' />
                </LoadingContainer> :

                <Tags ref={nav} onScroll={handleHidePaddle}>
                    {
                        tags && tags.map((tag, index) => (
                            <TagLink href="/tag/[name]" as={`/tag/${tag}`} key={ index }>
                                {tag}
                            </TagLink>
                        ))
                    }
                </Tags>
            }
            <RightPaddle disabled={loading || hideRightPaddle} onClick={scrollNavRight}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </RightPaddle>
        </Header>
    );
}

export default HomeHeader;