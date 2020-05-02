import React, { useContext, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { MainContext } from '../contexts/MainContext';
import { getComments, addComment } from '../API';
import Comment from './Comment';
import { PrimaryButton } from './ui/Button';
import { StyledLink } from './ui/Link';
import { TextArea } from './ui/Input';
import { device } from '../globals';
import { AlertContext } from '../contexts/AlertContext';

const CommentContainer = styled.section`
    background: ${({ theme }) => theme.inputBg};
    padding: 2rem;
    h2 {
        text-align: center;
    }

    @media ${device.mobile} {
        padding: 0.6rem;
    }
`;

const Section = styled.section`
    margin: 2rem 0;
`;

const LoginSection = styled.section`
    font-size: 1.1em;

    @media ${device.mobile} {
        text-align: center;
    }
`;

const Form = styled.form`
    background: ${({ theme }) => theme.inputBg};
    padding-top: 0.9rem;
    position: sticky;
    top: 0;
    z-index: 2;
`;

const CommentSection = ({ postId, postOwnerId }) => {
    const { value: comment, bind: bindComment, reset } = useInput('');
    const { user } = useContext(MainContext);
    const { comments, dispatchComments } = useContext(MainContext);
    const { sendError } = useContext(AlertContext);
    const [ loading, setLoading ] = useState(false);
    const ignore = useRef(false);

    useEffect(() => {
        getComments(postId)
            .then(postComments => {
                if (!ignore.current) {
                    dispatchComments({ type: 'GET_COMMENTS', payload: postComments });
                }
            })
            .catch(error => {
                sendError(error.message || error.response.message);
            });

        return () => ignore.current = true;
    }, [ignore.current])

    const submitComment = (e) => {
        e.preventDefault();
        if (user.isLoggedIn) {
            setLoading(true);
            addComment({ comment, postId })
                .then(addedComment => {
                    if (!ignore.current) {
                        reset();
                        setLoading(false);
                        dispatchComments({ type: 'ADD_NEW_COMMENT', payload: addedComment });
                    }
                }).catch(error => {
                    if (!ignore.current) {
                        setLoading(false);
                        sendError(error.message || error.response.message);
                    }
                });
        }
    } 

    return (
        <CommentContainer>
            <h2>Comments</h2>
            {
                user.isLoggedIn ?
                    <Form onSubmit={ submitComment }>
                        <TextArea
                            placeholder="Add comment"
                            required
                            { ...bindComment }
                        />
                        <PrimaryButton
                            type="submit"
                            big
                            disabled={loading}
                        >
                            Add comment
                        </PrimaryButton>
                    </Form> :
                    <LoginSection>
                        <p><StyledLink href="/login" blue>Login</StyledLink> to add a comment</p>
                    </LoginSection>
            }
            <Section>
                {
                    comments.map(({ author, body, _id, createdAt }) => {
                            const formatedDate = new Date(createdAt).toDateString();
                            return <Comment
                                key={ _id }
                                id={ _id }
                                author={ author }
                                date={ formatedDate }
                                body={ body }
                                postOwnerId={ postOwnerId }
                            />
                        })
                }
            </Section>
        </CommentContainer>
    );
}

export default CommentSection;