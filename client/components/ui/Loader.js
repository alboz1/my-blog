import React from 'react';
import styled, { keyframes } from 'styled-components';

const animateShape1 = keyframes`
    from {
        transform: translate(0, 0);
    } to {
        transform: translate(23px, 23px);
    }
`;

const animateShape2 = keyframes`
    from {
        transform: translate(0, 0);
    } to {
        transform: translate(-23px, 23px);
    }
`;

const animateShape3 = keyframes`
    from {
        transform: translate(0, 0);
    } to {
        transform: translate(23px, -23px);
    }
`;

const animateShape4 = keyframes`
    from {
        transform: translate(0, 0);
    } to {
        transform: translate(-23px, -23px);
    }
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4rem 0;
`;

const StyledLoader = styled.div`
    width: 40px;
    height: 40px;
    position: relative;
    transform: rotate(45deg);
`;

const Shape = styled.div.attrs(({ color }) => ({
    color: color,
}))`
    animation: ${({ animate }) => animate} 0.5s ease 0s infinite alternate;
    background: ${({ color }) => color};
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 1px;
    ${({ shape }) => shape === '1' && 'top: 0'};
    ${({ shape }) => shape === '2' && 'right: 0'};
    ${({ shape }) => shape === '3' && 'bottom: 0'};
    ${({ shape }) => shape === '4' && 'bottom: 0; right: 0'};
`

const Loader = () => {
    return (
        <Container>
            <StyledLoader>
                <Shape shape="1" color="#578CF9" animate={animateShape1}/>
                <Shape shape="2" color="#EFF3FB" animate={animateShape2}/>
                <Shape shape="3" color="#EFF3FB" animate={animateShape3}/>
                <Shape shape="4" color="#578CF9" animate={animateShape4}/>
            </StyledLoader>
        </Container>
    );
}

export default Loader;