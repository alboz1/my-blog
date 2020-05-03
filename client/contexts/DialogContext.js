import React, { useState, createContext, useEffect } from 'react';
import { deleteBlogPost } from '../API';

const initalValue = {
    dialog: {
        open: false,
        confirm: false
    },
    openDialog: () => {},
    closeDialog: () => {},
};

export const DialogContext = createContext(initalValue);

export const DialogProvider = ({ children }) => {
    const [dialog, setDialog] = useState({
        open: false,
        confirm: false
    });

    const openDialog = () => {
        setDialog({
            open: true,
            confirm: false
        });
    }

    const closeDialog = () => {
        setDialog({
            open: false,
            confirm: false
        });
    }

    const confirm = () => {
        setDialog({
            open: false,
            confirm: true
        });
    }

    const deny = () => {
        setDialog({
            open: false,
            confirm: false
        });
    }

    return (
        <DialogContext.Provider value={{ dialog, setDialog, openDialog, closeDialog, confirm, deny }}>
            { children }
        </DialogContext.Provider>
    );
}