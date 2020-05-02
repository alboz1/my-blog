import React, { useContext } from 'react';
import styled from 'styled-components';
import { DialogContext } from '../../contexts/DialogContext';
import { SecondaryButton, CloseButton, DeleteButton } from './Button';
import { defaultBoxShadow } from '../../globals/theme';
import { animateDialog } from './animations';
import { device } from '../../globals';

const Dialog = styled.div`
    animation: ${animateDialog} 0.2s cubic-bezier(.22,.23,.25,1.05);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: ${({ theme }) => theme.bg};
    border-radius: 5px;
    box-sizing: border-box;
    box-shadow: ${defaultBoxShadow};
    padding: 1rem;
    text-align: center;
    z-index: 7;

    @media ${device.mobile} {
        width: 90%;
        padding: 0.8rem;
    }
`;

const DialogHeader = styled.header`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.lightGrey};
`;

const DialogBody = styled.main`
    margin: 2rem 0;
    color: ${({ theme }) => theme.primaryText};
    @media ${device.mobile} {
        margin: 1.3rem 0;
    }
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1;
`;

const ConfirmDialog = () => {
    const { closeDialog, confirm, deny } = useContext(DialogContext);

    return (
        <>
            <Dialog>
                <DialogHeader>
                    <CloseButton onClick={closeDialog} small>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>
                    </CloseButton>
                </DialogHeader>
                <DialogBody>
                    <p>Are you sure you want to delete this post?</p>
                </DialogBody>
                <div>
                    <DeleteButton onClick={confirm} ml>Yes</DeleteButton>
                    <SecondaryButton onClick={deny} ml>No</SecondaryButton>
                </div>
            </Dialog>
            <Overlay onClick={closeDialog}></Overlay>
        </>
    );
}

export default ConfirmDialog;