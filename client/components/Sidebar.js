import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
// import Links from './ui/Link';
import Popover from './common/Popover';
import ThemeSwitch from './common/ThemeSwitch';
import { MainContext } from '../contexts/MainContext';
import useClickOutside from '../hooks/useClickOutside';
import { StyledLink } from './ui/Link';
import { DefaultButton } from './ui/Button';
import { defaultBoxShadow } from '../globals/theme';
import { device } from '../globals';
import { slideInFromLeft } from './ui/animations';
import DefaultAvatar from './common/DefaultAvatar';

const Aside = styled.aside`
    background: ${({ theme }) => theme.bg};
    box-shadow: ${defaultBoxShadow};
    box-sizing: border-box;
    padding: 3rem 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 150px;
    @media ${device.mobile} {
        display: none;
    }
`;

const Avatar = styled.img`
    width: 100%;
    height: 100%;
`;

const AvatarBtn = styled(DefaultButton)`
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    height: 45px;
    width: 45px;
`;

const SideBarLink = styled(StyledLink)`
    margin-top: 1.5rem;
    text-align: left;
    width: 100%;

    &::after {
        content: '${({ name }) => name}';
        font-size: 0.82em;
        display: inline-block;
        vertical-align: super;
        margin-left: 0.5rem;
    }
    &[aria-current="page"] {
        color: ${({ theme }) => theme.primary.default};
    }
`;

const Sidebar = () => {
    const { user } = useContext(MainContext);
    const popover = useRef();
    const { open, setOpen } = useClickOutside(popover);

    const openPopover = () => {
        setOpen(true);
    }

    return (
        <Aside>
            <ThemeSwitch />
            <div>
                <SideBarLink block href='/' name="Home">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                </SideBarLink>
                {
                    user.isLoggedIn &&
                    <SideBarLink block href="/dashboard" name="Dashboard">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-database"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
                    </SideBarLink>
                }
            </div>
            {
                user.isLoggedIn ?
                (
                    <>
                        <AvatarBtn margin="0" onClick={openPopover}>
                            {
                                user.avatar ?
                                <Avatar src={user.avatar} alt={user.username} /> :
                                <DefaultAvatar />
                            }
                        </AvatarBtn>
                        {
                            open ?
                            <Popover
                                reference={popover}
                                bottom="40px"
                                right="-145px"
                                animate={slideInFromLeft}
                            /> : null
                        }
                    </>
                ) :
                (
                    <span>
                        <SideBarLink block href="/login" name="Login">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-in"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
                        </SideBarLink>
                        <SideBarLink block href="/signup" name="Sign Up">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                        </SideBarLink>
                    </span>
                )
            }
        </Aside>
    )
}

export default Sidebar