import React from 'react';
import styled from 'styled-components';

const AvatarContainer = styled.div`
    width: 100%;
    height: 100%;
    svg .bg {
        fill: ${({ theme }) => theme.placeholder};
    }
    svg .avatar {
        fill: ${({ theme }) => theme.links};
    }
`;

const DefaultAvatar = () => {
    return (
        <AvatarContainer>
            <svg width="100%" height="100%" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle className="bg" cx="60" cy="60" r="60" fill="#F1F1F1"/>
                <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="120" height="120">
                <circle className="avatar" cx="60" cy="60" r="60" fill="white"/>
                </mask>
                <g mask="url(#mask0)">
                <path className="avatar" d="M61.0123 67C38.9414 67 19 83.1178 19 103L34.5 128L61.0123 121.5H90L102 103C102 83.1178 83.0833 67 61.0123 67Z" fill="white"/>
                <circle className="avatar" cx="59.5" cy="36.5" r="23.5" fill="white"/>
                </g>
            </svg>
        </AvatarContainer>
    );
}

export default DefaultAvatar;