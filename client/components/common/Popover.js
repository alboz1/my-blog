import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { MainContext } from '../../contexts/MainContext';
import { logoutUser } from '../../API';
import { PopoverLink } from '../ui/Link';
import { defaultBoxShadow } from '../../globals/theme';
import { device } from '../../globals';
import { AlertContext } from '../../contexts/AlertContext';
import ThemeSwitch from './ThemeSwitch';
import { useRouter } from 'next/router';
import { DefaultButton } from '../ui/Button';

const Container = styled.div`
    animation: ${({ animate }) => css`${animate} 0.2s cubic-bezier(.22,.23,.25,1.05)`};
    background: ${({ theme }) => theme.popoverBg};
    box-shadow: ${defaultBoxShadow};
    border: 1px solid ${({ theme }) => theme.inputBg};
    border-radius: 5px;
    box-sizing: border-box;
    padding: 0.5rem 0;
    position: absolute;
    top: ${({ top }) => top};
    bottom: ${({ bottom }) => bottom};
    right: ${({ right }) => right};
    left: ${({ left }) => left};

    button {
        padding: 0.7rem 0;
    }

    @media ${device.mobile} {
        padding: 0.5rem 0;
        left: 10px;
        right: 10px;
    }
`;

const LogoutBtn = styled(DefaultButton)`
    color: ${({ theme }) => theme.links};
    transition: all 0.2s ease-in-out;
    
    &:hover {
        color: ${({ theme }) => theme.linksHover};
    }

    @media ${device.mobile} {
        padding: 0.7rem 0;
        font-size: 1.08em;
    }
`;

const Popover = ({ reference, animate, top, bottom, right, left }) => {
    const { user, dispatchUserAction } = useContext(MainContext);
    const { sendError } = useContext(AlertContext);
    const router = useRouter();

    const handleLogout = () => {
        logoutUser()
            .then(() => {
                dispatchUserAction({type: 'LOGOUT'});
                router.replace('/');
            }).catch(error => {
                sendError(error.message);
            });
    }
    
    return (
        <Container ref={reference} animate={animate} top={top} bottom={bottom} right={right} left={left}>
            <PopoverLink block href="/user/[username]" as={`/user/${user.username.replace(' ', '')}`} prefetch={false}>My Profile</PopoverLink>
            <LogoutBtn wide small onClick={handleLogout}>Log out</LogoutBtn>
            <ThemeSwitch mobile/>
        </Container>
    );
}

export default Popover;