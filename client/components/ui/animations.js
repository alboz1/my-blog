import { keyframes } from 'styled-components';

export const slideInFromLeft = keyframes`
    from {
        opacity: 0;
        transform: translateX(-10%);
    } to {
        opacity: 1;
        transform: translateX(0);
    }
`;

export const slideFromBottom = keyframes`
    from {
        opacity: 0;
        transform: translateY(10%);
    } to {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const slideInFromTop = keyframes`
    from {
        opacity: 0;
        transform: translate(-50%, -10%);
    } to {
        opacity: 1;
        transform: translate(-50%, 0);
    }
`;

export const slideInFromTopMobile = keyframes`
    from {
        opacity: 0;
        transform: translateY(-10%);
    } to {
        opacity: 1;
        transform: translateY(0%);
    }
`;

export const animateDialog = keyframes`
    from {
        opacity: 0;
        transform: translate(-50%, -60%);
    } to {
        opacity: 1;
        transform: translate(-50%, -50%);
    }
`;

export const zoomIn = keyframes`
    from {
        opacity: 0;
        transform: scale(0.7);
    } to {
        opacity: 1;
        transform: scale(1);
    }
`;

export const fadeIn = keyframes`
    from {
        opacity: 0;
    } to {
        opacity: 1;
    }
`;