import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import Form from '../components/common/Form';
import { MainContext } from '../contexts/MainContext';
import useInput from '../hooks/useInput';
import { loginUser, isAuthenticated } from '../API';
import { Input, Label } from '../components/ui/Input';
import { PrimaryButton, CloseButton } from '../components/ui/Button';
import { device } from '../globals';
import { StyledLink } from '../components/ui/Link';
import { useRouter } from 'next/router';
import redirect from '../utils/redirect';
import Layout from '../components/common/Layout';

const Container = styled.div`
    padding: 5rem 0;
    margin: 0 auto;
    max-width: 700px;
    & h3 {
        text-align: center;
    }
    @media ${device.mobile} {
        padding: 4rem 0;
    }
`;

const ForgotContainer = styled.div`
    margin-top: 2rem;
    text-align: center;
`;

const Alert = styled.div`
    background: ${({ theme }) => theme.danger.default};
    border-radius: 5px;
    color: #ffffff;
    text-align: center;
    padding: 0 0.7rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media ${device.mobile} {
        font-size: 0.9em;
    }
`;

const Login = () => {
    const { value: email, bind: bindEmail } = useInput('');
    const { value: password, bind: bindPassword } = useInput('');
    const { dispatchUserAction } = useContext(MainContext);
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const router = useRouter();
    let ignore = false;

    useEffect(() => {
        return () => ignore = true;
    }, [ignore])

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);

        loginUser({
            email,	
            password
        })
        .then(response => {
            if (!ignore) {
                router.back();
                dispatchUserAction({
                    type: 'GET_USER',
                    username: response.username,
                    avatar: response.avatar,
                    id: response.id
                });
                setLoading(false);
            }
        })
        .catch(error => {
            if (!ignore) {
                setLoading(false);
                setError(error.message || error.response.message);
            }
        });
    }

    return (
        <Layout title="Login">
            <Container>
                <h3>Log in to your account</h3>
                <Form handleSubmit={handleSubmit}>
                    {
                        error &&
                        <Alert>
                            <p>{error}</p>
                            <CloseButton onClick={() => setError('')} small white>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>
                            </CloseButton>
                        </Alert>
                    }
                    <Label margin="0.9rem 0" htmlFor="email">Email</Label>
                    <Input type="text" name="email" id="email" placeholder="Email" {...bindEmail} required />
                    <Label margin="0.9rem 0" htmlFor="password">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="Password" {...bindPassword} required />
                    <PrimaryButton type="submit" disabled={loading}>
                        Login
                    </PrimaryButton>
                </Form>
                <ForgotContainer>
                    <StyledLink href="/forgot-password">Forgot password?</StyledLink>
                </ForgotContainer>
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
    }
}

export default Login;
