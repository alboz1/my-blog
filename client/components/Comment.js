import React, { useContext, useState, useRef } from 'react';
import styled from 'styled-components';
import { Small } from './ui/Small';
import { DefaultButton, PrimaryButton, SecondaryButton } from './ui/Button';
import { TextArea } from './ui/Input';
import { device } from '../globals';
import { deleteComment, editComment } from '../API';
import useInput from '../hooks/useInput';
import { MainContext } from '../contexts/MainContext';
import { AlertContext } from '../contexts/AlertContext';
import { defaultBoxShadow } from '../globals/theme';
import useClickOutside from '../hooks/useClickOutside';
import { zoomIn } from './ui/animations';
import Loader from './ui/Loader';

const StyledComment = styled.div`
    background: ${({ theme }) => theme.bg};
    border-bottom: 1px solid ${({ theme }) => theme.lightGrey};
    padding: 1.3rem 2rem;
    position: relative;
    z-index: 1;
    &:last-child {
        border: none;
    }

    @media ${device.mobile} {
        padding: 1.3rem 0.9rem;
    }
`;

const CommentHeader = styled.header`
    display: flex;
    justify-content: space-between;
    h4 {
        margin: 0;
    }
    button {
        align-self: flex-start;
    }
    button svg {
        color: ${({ theme }) => theme.links};
        transition: 0.2s ease;
    }
    button:hover svg {
        stroke: ${({ theme }) => theme.linksHover};
    }
`;

const CommentBody = styled.p`
    margin: 1.5rem 0;

    @media ${device.mobile} {
        margin: 0.6rem 0;
    }
`;

const Options = styled.div`
    position: relative;
`;

const Settings = styled.div`
    animation: ${zoomIn} 0.2s cubic-bezier(.22,.23,.25,1.05);
    background: ${({ theme }) => theme.bg};
    box-shadow: ${defaultBoxShadow};
    box-sizing: border-box;
    position: absolute;
    right: 100%;
    top: 0;
    transform-origin: 150% -100%;
    z-index: 2;
    button {
        padding: 0.3rem 4rem;
        margin: 0.5rem 0;
        transition: 0.2s ease;
    }

    button:hover {
        color: ${({ theme }) => theme.linksHover};
    }
`;

const LoaderWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.bgLoader};
    z-index: 3;
    display: ${({ show }) => show ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    & > div {
        padding: 0;
        height: 100%;
    }
`;

const Comment = ({ id, author, date, body, postOwnerId }) => {
    const { value: comment, setValue: setComment } = useInput('');
    const { user, dispatchComments } = useContext(MainContext);
    const { sendSuccess, sendError } = useContext(AlertContext);
    const [ edit, setEdit ] = useState(false);
    const [ disableBtn, setDisableBtn ] = useState(false);
    const settingsPannel = useRef();
    const { open, setOpen } = useClickOutside(settingsPannel);
    const [ loading, setLoading ] = useState(false);

    const openSetting = () => {
        setOpen(true);
    }

    const saveComment = (e) => {
        e.preventDefault();
        setDisableBtn(true);
        editComment(id, { comment })
            .then(response => {
                dispatchComments({ type: 'EDIT_COMMENT', id: id, newComment: comment });
                sendSuccess(response.message);
                setDisableBtn(false);
            })
            .catch(error => {
                sendError(error.response.message);
                setDisableBtn(false);
            });
    }

    const handleDeleteComment = () => {
        setOpen(false);
        setLoading(true);
        deleteComment(id)
            .then(response => {
                dispatchComments({ type: 'DELETE_COMMENT', id: id });
                sendSuccess(response.message);
            })
            .catch(error => {
                sendError(error.response.message);
            });
    }

    return (
        <StyledComment>
            <LoaderWrapper show={loading}>
                <Loader />
            </LoaderWrapper>
            {
                edit ?
                <form onSubmit={saveComment}>
                    <TextArea
                        mb
                        blueBg
                        defaultValue={body}
                        required
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <div>
                        <PrimaryButton margin="0" type="submit" disabled={disableBtn}>Save</PrimaryButton>
                        <SecondaryButton ml type="button" onClick={() => setEdit(false)}>Cancel</SecondaryButton>
                    </div>
                </form> :
                <>
                    <CommentHeader>
                        <div>
                            <h4>{ author }</h4>
                            <Small fontSize="0.8em">{ date }</Small>
                        </div>
                        {
                            (author === user.username || postOwnerId === user.id) &&
                            <Options>
                                <DefaultButton small greyColor onClick={openSetting}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                                </DefaultButton>
                                {
                                    open &&
                                    <Settings ref={settingsPannel}>
                                        {
                                            author === user.username ?
                                            <>
                                                <DefaultButton small greyColor wide onClick={() => setEdit(true)}>Edit</DefaultButton>
                                                <DefaultButton small greyColor wide onClick={handleDeleteComment}>Delete</DefaultButton>
                                            </> :
                                            postOwnerId === user.id &&
                                            <DefaultButton small greyColor wide onClick={handleDeleteComment}>Delete</DefaultButton>
                                        }
                                    </Settings>
                                }
                            </Options>
                        }
                    </CommentHeader>
                    <CommentBody>{ body }</CommentBody>
                </>
            }
        </StyledComment>
    );
}

export default Comment;