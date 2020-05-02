import React, { useContext } from 'react';
import styled from 'styled-components';
import { ToggleThemeContext } from '../../contexts/ThemeContext';
import { DefaultButton } from '../ui/Button';
import { device } from '../../globals';

const Switch = styled.div`
    display: ${({ mobile }) => mobile ? 'none' : 'block'};
    svg, p {
        color: ${({ theme }) => theme.links};
        stroke: ${({ theme }) => theme.links};
        transition: all 0.2s ease-in-out;
    }
    &:hover svg, &:hover p {
        color: ${({ theme }) => theme.linksHover};
        stroke: ${({ theme }) => theme.linksHover};
    }

    @media ${device.mobile} {
        display: block;
    }
`;

const ThemeSwitch = ({mobile, text}) => {
    const { themeMode, toggleTheme } = useContext(ToggleThemeContext);

    return (
        <Switch mobile={mobile}>
            <DefaultButton small wide onClick={toggleTheme}>
                {
                    themeMode.light ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg> :
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                }
                {
                    text &&
                    <p>
                        { themeMode.light ? 'Dark' : 'Light' } theme
                    </p>
                }
            </DefaultButton>
        </Switch>
    );
}

export default ThemeSwitch;