import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { AlertContext } from '../../contexts/AlertContext';
import { defaultBoxShadow } from '../../globals/theme';
import { CloseButton } from '../ui/Button';
import { slideInFromTop, slideInFromTopMobile } from '../ui/animations';
import { device } from '../../globals';

const StyledAlert = styled.div`
    animation: ${slideInFromTop} 0.2s cubic-bezier(.22,.23,.25,1.05);
    background: ${({ theme }) => theme.bg};
    box-shadow: ${defaultBoxShadow};
    border-left: 3px solid ${({ type, theme }) => type === 'success' ? theme.success.default : theme.danger.default};
    border-radius: 0 5px 5px 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem 1rem;
    position: fixed;
    top: 25px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
    width: 400px;

    @media ${device.mobile} {
        animation: ${slideInFromTopMobile} 0.2s cubic-bezier(.22,.23,.25,1.05);
        border-left-width: 5px;
        border-radius: 0;
        top: 0;
        left: 0;
        right: 0;
        transform: translateX(0%);
        width: 100%;
    }
`;

const Icon = styled.i`
    & svg {
        stroke: ${({ type, theme }) => type === 'success' ? theme.success.default : theme.danger.default};
        vertical-align: middle;
    }
`;

const AlertBody = styled.div`
    color: ${({ theme }) => theme.primaryText};
    margin: 0 4.5rem 0 1rem;
`;

const Type = styled.p`
    color: ${({ theme }) => theme.primaryText};
    font-weight: 600;
    margin: 0 0 0.4rem 0;

`;

const Text = styled.p`
    color: ${({ theme }) => theme.secondaryText};
    font-size: 0.9em;
    margin: 0;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
`;

const Alert = () => {
    const { alert, closeAlert } = useContext(AlertContext);

    useEffect(() => {
        return () => closeAlert();
    }, [])

    return (
        <>
            {
                alert.active &&
                <StyledAlert type={alert.type}>
                    <Wrapper>
                        <Icon type={alert.type}>
                            {
                                alert.type === 'success' ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            }
                        </Icon>
                        <AlertBody>
                            <Type>{ alert.type === 'success' ? 'Success' : 'Error' }</Type>
                            <Text>{ alert.text }</Text>
                        </AlertBody>
                    </Wrapper>
                    <CloseButton onClick={closeAlert} small>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>
                    </CloseButton>
                </StyledAlert>
            }
        </>
    );
}

export default Alert;