import React, { useRef, useContext } from 'react';
import styled from 'styled-components';
import { MainContext } from '../contexts/MainContext';
import useClickOutside from '../hooks/useClickOutside';
import Popover from './common/Popover';
import { StyledLink } from './ui/Link';
import { DefaultButton } from './ui/Button';
import { device } from '../globals';
import DefaultAvatar from './common/DefaultAvatar';
import { slideFromBottom } from './ui/animations';
import ThemeSwitch from './common/ThemeSwitch';

const Nav = styled.nav`
    background: ${({ theme }) => theme.bg};
    border-top: 1px solid ${({ theme }) => theme.lightGrey};
    box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.05);
    display: none;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    font-size: 0.8em;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 6;
    & > a, & > button {
        flex: 1;
        padding: 0.8rem 0;
    }
    p {
        margin: 0;
    }
    @media ${device.mobile} {
        display: flex;
    }
`;

const Avatar = styled.div`
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    overflow: hidden;
    line-height: initial;
    width: 28px;
    height: 28px;
    img {
        width: 100%;
        height: 100%;
    }
`;

const ProfileButton = styled(DefaultButton)`
    position: relative;
    p {
        color: ${({ theme }) => theme.links};
        transition: all 0.2s ease-in-out;
    }

    &:hover p {
        color: ${({ theme }) => theme.linksHover};
    }
`;

const ThemeSwitchWrapper = styled.div`
    flex: 1;
    padding: 0.8rem 0;
    button {
        margin: 0;
    }
`;

const NavLink = styled(StyledLink)`
    &[aria-current="page"] {
        color: ${({ theme }) => theme.primary.default};
    }
`;

const MobileNav = () => {
    const { user } = useContext(MainContext);
    const popover = useRef();
    const { open, setOpen } = useClickOutside(popover);

    const openPopover = () => {
        setOpen(true);
    }
    
    return (
        <Nav>
            <NavLink small="true" href="/">
                <div>
                    <i>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    </i>
                    <p>Home</p>
                </div>
            </NavLink>
            {
                user.isLoggedIn ?
                <>
                    <NavLink small="true" block href="/dashboard">
                        <div>
                            <i>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-database"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
                            </i>
                            <p>Dashboard</p>
                        </div>
                    </NavLink>
                    <ProfileButton margin="0" onClick={openPopover}>
                        <Avatar>
                            {
                                user.avatar ?
                                <img src={user.avatar} alt={user.username} /> :
                                <DefaultAvatar />
                            }
                        </Avatar>
                        <p>Profile</p>
                    </ProfileButton>
                    {
                        open ?
                        <Popover
                            reference={popover}
                            bottom="80px"
                            right="15px"
                            animate={slideFromBottom}
                        /> : null
                    }
                </> :
                <>
                    <NavLink small="true" block href="/login">
                        <div>
                            <i>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-in"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
                            </i>
                            <p>Login</p>
                        </div>
                    </NavLink>
                    <NavLink small="true" block href="/signup">
                        <div>
                            <i>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                            </i>
                            <p>Sign Up</p>
                        </div>
                    </NavLink>
                    {
                        !user.isLoggedIn &&
                        <ThemeSwitchWrapper>
                            <ThemeSwitch text />
                        </ThemeSwitchWrapper>
                    }
                </>
            }
        </Nav>
    );
}

export default MobileNav;