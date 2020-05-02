import React from 'react';
import styled from 'styled-components';
import { TagLink } from '../ui/Link';
import useTags from '../../hooks/useTags';
import Placeholder from './Placeholder';
import { device } from '../../globals';

const FlexContainer = styled.section`
    flex: 1;
    align-self: flex-start;
    border-right: 1px solid ${({ theme }) => theme.lightGrey};
    padding: 0 1rem;
    height: 100%;
    position: ${({ isHomePage }) => isHomePage ? 'relative' : 'sticky'};
    top: ${({ isHomePage }) => isHomePage ? '0' : '10px'};

    @media ${device.mobile} {
        background: ${({ theme }) => theme.bg};
        border: none;
        padding: 0;
        top: 0;
        flex: 0;
        width: 100%;
        h3 {
            display: none;
        }
    }
`;

const TagsWrapper = styled.div`
    height: 100%;

    @media ${device.mobile} {
        height: 70px;
        overflow: hidden;
    }
`;

const ScrollWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;

    @media ${device.mobile} {
        flex-wrap: nowrap;
        overflow-y: hidden;
        overflow-x: auto;
        padding: 0.6rem 0 5rem 0;
    }
`;

const TagsSection = () => {
    const { tags, loading, error } = useTags();

    return (
        <FlexContainer>
            <h3>Tags</h3>
            <TagsWrapper>
                <ScrollWrapper>
                    {
                        error ? <p>{ error }</p> :
                        loading ? (
                            <>
                                <Placeholder placeholderFor='tag' />
                                <Placeholder placeholderFor='tag' />
                                <Placeholder placeholderFor='tag' />
                                <Placeholder placeholderFor='tag' />
                                <Placeholder placeholderFor='tag' />
                                <Placeholder placeholderFor='tag' />
                            </>
                        ) :
                        tags.map((tag, index) => (
                            <TagLink
                                href={`/tag/[name]`}
                                as={`/tag/${tag}`}
                                key={ index }
                            >
                                { tag }
                            </TagLink>
                        ))
                    }
                </ScrollWrapper>
            </TagsWrapper>
        </FlexContainer>
    );
}

export default TagsSection;