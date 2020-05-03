import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import ConfirmDialog from './ui/ConfirmDialog';
import { publishBlogPost, unpublishBlogPost, deleteBlogPost } from '../API';
import { MainContext } from '../contexts/MainContext';
import { AlertContext } from '../contexts/AlertContext';
import { defaultBoxShadow } from '../globals/theme';
import { PrimaryButton, DeleteButton, DefaultButton } from './ui/Button';
import { StyledLink } from './ui/Link';
import { DialogContext } from '../contexts/DialogContext';
import { device } from '../globals';

const StyledTable = styled.table`
    background: ${({ theme }) => theme.sidebarBg};
    border: 1px solid ${({ theme }) => theme.lightGrey};
    border-radius: 5px;
    border-collapse: separate;
    border-spacing: 0;
    box-sizing: border-box;
    box-shadow: ${ defaultBoxShadow };
    margin-bottom: 1.5rem;
    font-size: 0.95em;
    width: 100%;

    tr td {
        background: ${({ theme }) => theme.sidebarBg};
        border-bottom: 1px solid ${({ theme }) => theme.lightGrey};
        color: ${({ theme }) => theme.secondaryText};
        padding: 1rem;
        text-align: center;
        width: 20%;

        @media ${device.mobile} {
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.83em;
            text-align: right;
            width: 100%;
            &:before {
                content: attr(data-label);
                float: left;
                font-weight: 600;
                text-transform: uppercase;
            }
            &:last-child {
                border-bottom: none;
            }
        }
    }
    tr td:first-child {
        text-align: left;
        padding: 0;

        @media ${device.mobile} {
            padding: 1rem;
            text-align: right;
        }
    }
    tr td > a {
        display: block;
        padding: 1rem;

        @media ${device.mobile} {
            font-size: 1.2em;
            padding: 0;
        }
    }

    @media ${device.mobile} {
        border: 0;
        box-shadow: 0;
        tr {
            border: 1px solid ${({ theme }) => theme.lightGrey};
            box-shadow: ${ defaultBoxShadow };
            display: block;
            margin-bottom: .5rem;
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
`;

const TableHeader = styled.thead`
    border-bottom: 1px solid ${({ theme }) => theme.lightGrey};
    & > tr > th {
        background: ${({ theme }) => theme.inputBg};
        color: ${({ theme }) => theme.secondaryText};
        font-weight: 600;
        padding: 1rem;
        position: sticky;
        top: 0;
    }
    & tr th > svg {
        display: 'inline-block';
        vertical-align: middle;
        margin-left: 0.3rem;
    }

    @media ${device.mobile} {
        display: none;
    }
`;

const Table = () => {
    const { dashboardPosts, dispatchPostAction } = useContext(MainContext);
    const { dialog, openDialog, closeDialog } = useContext(DialogContext);
    const { sendSuccess, sendError } = useContext(AlertContext);
    const [ deleteButton, setDeleteButton ] = useState('');
    const [ reverseSort, setReverseSort ] = useState({
        byPublished: false,
        byDate: false
    });
    let ignore = false;

    useEffect(() => {
        if (dialog.confirm) {
            disableButton(deleteButton);
            deleteBlogPost(deleteButton.target.id)
                .then(data => {
                    if (!ignore) {
                        dispatchPostAction({ type: 'DELETE_POST', id: deleteButton.target.id });
                        sendSuccess(data.message);
                        deleteButton.target.disabled = false;
                        deleteButton.target.previousSibling.disabled = false;
                        closeDialog();
                    }
                }).catch(error => {
                    if (!ignore) {
                        sendError(error.message || error.response.message);
                        deleteButton.target.disabled = false;
                        deleteButton.target.previousSibling.disabled = false;
                        closeDialog();
                    }
                });
        }

        return () => ignore = true;
    }, [ignore, dialog.confirm])

    const disableButton = (e) => {
        e.persist();
        e.target.disabled = true;
        if (e.target.nextSibling) {
            e.target.nextSibling.disabled = true;
        } else {
            e.target.previousSibling.disabled = true;
        }
    }

    const handleDeletePost = (e) => {
        e.persist();
        openDialog();
        setDeleteButton(e);
    }

    const handlePublishPost = (e) => {
        e.persist();
        disableButton(e);
        publishBlogPost(e.target.id)
            .then(data => {
                dispatchPostAction({ type: 'PUBLISH_POST', id: e.target.id });
                sendSuccess(data.message);
                e.target.disabled = false;
                e.target.nextSibling.disabled = false;
            }).catch(error => {
                if (!ignore) {
                    sendError(error.message || error.response.message);
                    e.target.disabled = false;
                    e.target.nextSibling.disabled = false;
                }
            });
    }

    const handleMakePrivatePost = (e) => {
        e.persist();
        disableButton(e);
        unpublishBlogPost(e.target.id)
            .then(data => {
                dispatchPostAction({ type: 'UNPUBLISH_POST', id: e.target.id });
                sendSuccess(data.message);
                e.target.disabled = false;
                e.target.nextSibling.disabled = false
            }).catch(error => {
                if (!ignore) {
                    sendError(error.message || error.response.message);
                    e.target.disabled = false;
                    e.target.nextSibling.disabled = false;
                }
            });
    }

    const sortByPublished = () => {
        dispatchPostAction({ type: 'SORT_BY_PUBLISHED', reverse: reverseSort.byPublished });
        setReverseSort({
            byPublished: !reverseSort.byPublished,
            byDate: reverseSort.byDate
        });
    }

    const sortByDate = () => {
        dispatchPostAction({ type: 'SORT_BY_DATE', reverse: reverseSort.byDate });
        setReverseSort({
            byPublished: reverseSort.byPublished,
            byDate: !reverseSort.byDate
        });
    }
    
    return (
        <>
            <StyledTable>
                <TableHeader>
                    <tr>
                        <th>Name</th>
                        <DefaultButton
                            onClick={sortByDate}
                            as={'th'}
                        >
                            <span>Updated</span>
                            {
                                reverseSort.byDate ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            }
                        </DefaultButton>
                        <DefaultButton
                            onClick={sortByPublished}
                            as={'th'}>
                            <span>Status</span>
                            {
                                reverseSort.byPublished ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            }
                        </DefaultButton>
                        <th>Action</th>
                    </tr>
                </TableHeader>

                <tbody>
                    {
                        dashboardPosts && dashboardPosts.map((post, index) => {
                            const updatedAt = new Date(post.updatedAt).toDateString();
                            return (
                                <tr key={ index }>
                                    <td data-label="Name">
                                        <StyledLink href="/post/edit-post/[id]" as={`/post/edit-post/${post._id}`} bold="true">
                                            {post.title}
                                        </StyledLink>
                                    </td>
                                    <td data-label="Updated">
                                        { updatedAt }
                                    </td>
                                    <td data-label="Status">
                                        { post.published ? 'Published' : 'Not Published' }
                                    </td>
                                    <td data-label="Action">
                                        <div>
                                            {
                                                post.published
                                                ?
                                                <PrimaryButton
                                                    small
                                                    id={post._id}
                                                    onClick={handleMakePrivatePost}
                                                >
                                                    Unpublish
                                                </PrimaryButton>
                                                :
                                                <PrimaryButton
                                                    small
                                                    id={post._id}
                                                    onClick={handlePublishPost}
                                                >
                                                    Publish
                                                </PrimaryButton>
                                            }
                                            <DeleteButton
                                                ml
                                                small
                                                id={post._id}
                                                onClick={handleDeletePost}
                                            >
                                                Delete
                                            </DeleteButton>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </StyledTable>
            {dialog.open && <ConfirmDialog />}
        </>
    );
}

export default Table;