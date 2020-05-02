import React, { useReducer, createContext, useContext } from 'react';
import userReducer from '../reducers/userReducer';
import blogReducer from '../reducers/blogReducer';
import commentReducer from '../reducers/commentReducer';
import { ToggleThemeContext } from './ThemeContext';
import { ThemeProvider } from 'styled-components';
import { theme } from '../globals/theme';

const initialValue = {
    user: {},
    dispatchUserAction: () => {},
    dashboardPosts: [],
    comments: []
};

export const MainContext = createContext(initialValue);

export const MainProvider = ({ children }) => {
    const [user, dispatchUserAction] = useReducer(userReducer, {});
    const [dashboardPosts, dispatchPostAction] = useReducer(blogReducer, []);
    const [comments, dispatchComments] = useReducer(commentReducer, []);

    return (
        <MainContext.Provider
            value={{
                user,
                dispatchUserAction,
                dashboardPosts,
                dispatchPostAction,
                comments,
                dispatchComments
            }}
        >
            {children}
        </MainContext.Provider>
    )
}