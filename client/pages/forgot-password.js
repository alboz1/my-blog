import React, { useState, useContext, useEffect } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { AlertContext } from '../contexts/AlertContext';
import { Label, Input } from '../components/ui/Input';
import { PrimaryButton } from '../components/ui/Button';
import { sendEmail, isAuthenticated } from '../API';
import useInput from '../hooks/useInput';
import { device } from '../globals';
import redirect from '../utils/redirect';
import Layout from '../components/common/Layout';

const Container = styled.div`
    max-width: 500px;
    margin: 0 auto;
    padding: 5rem 0;

    @media ${device.mobile} {
        button {
            width: 100%;
        }
    }
`;

const ForgotPassword = () => {
    const { value: email, bind: bindEmail, reset } = useInput('');
    const { sendSuccess, sendError } = useContext(AlertContext);
    const [ loading, setLoading ] = useState(false);
    let ignore = false;

    useEffect(() => {
        return () => ignore = true;
    }, [ignore])

    const submitEmail = (e) => {
        e.preventDefault();
        setLoading(true);
        sendEmail({ email })
            .then(response => {
                if (!ignore) {
                    sendSuccess(response.message);
                    reset();
                    setLoading(false);
                }
            })
            .catch(error => {
                if (!ignore) {
                    sendError(error.message || error.response.message);
                    reset();
                    setLoading(false);
                }
            });
    }

    return (
        <Layout title="Forgot Password">
            <Container>
                <h2>Reset your password</h2>
                <form onSubmit={submitEmail}>
                    <Label htmlFor="email">Enter your account's email address</Label>
                    <Input type="text" name="email" id="email" placeholder="Email" required {...bindEmail} />
                    <PrimaryButton type="submit" disabled={loading}>Send email</PrimaryButton>
                </form>
            </Container>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const user = await isAuthenticated(context);
    
    if (user.username) {
        redirect('/', context);
    }

    return {
        props: {}
    };
}

export default ForgotPassword;