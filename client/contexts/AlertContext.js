import React, { useState, createContext } from 'react';

const initialValue = {
    alert: {
        type: '',
        text: '',
        active: false
    },
    sendSuccess: () => {},
    sendError: () => {},
    closeAlert: () => {}
};

export const AlertContext = createContext(initialValue);

export const AlertProvider = ({ children }) => {
    const [ alert, setAlert ] = useState({
        type: '',
        text: '',
        active: false
    });

    const sendSuccess = (message) => {
        setAlert({
            type: 'success',
            text: message,
            active: true
        });
    }

    const sendError = (message) => {
        setAlert({
            type: 'error',
            text: message,
            active: true
        });
    }

    const closeAlert = () => {
        setAlert({
            type: '',
            text: '',
            active: false
        });
    }

    return (
        <AlertContext.Provider value={{ alert, closeAlert, sendSuccess, sendError }}>
            { children }
        </AlertContext.Provider>
    );
}