import React, { useContext, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { MainContext } from '../contexts/MainContext';
import { ToggleThemeContext } from '../contexts/ThemeContext';
import { theme } from '../globals/theme';

const AppWrapper = ({ children }) => {
    const { user, dispatchUserAction } = useContext(MainContext);
    const [ loading, setLoading ] = useState(true);
    const { themeMode } = useContext(ToggleThemeContext);

    useEffect(() => {
        if (!user.isLoggedIn) {
            fetch(`${process.env.API_URL}/api/user/`, {
                method: 'GET',
                mode: 'cors',
                credentials: 'include'
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error(response.statusText);
                    }
                }).then(response => {
                    dispatchUserAction({
                        type: 'GET_USER',
                        username: response.username,
                        avatar: response.avatar,
                        id: response.id
                    });
                    setLoading(false);
                }).catch(error => {
                    setLoading(false);
                });
            }
    }, [])

    return (
        <>
            { !loading && children}
        </>
        // <ThemeProvider theme={themeMode.light ? theme.light : theme.dark}>
        // </ThemeProvider>
    ) 
}

export default AppWrapper;