import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import { Label, Input } from '../../components/ui/Input';
import { PrimaryButton } from '../../components/ui/Button';
import { device } from '../../globals';
import { checkToken, resetPassword, isAuthenticated } from '../../API';
import { StyledLink } from '../../components/ui/Link';
import { Small } from '../../components/ui/Small';
import { AlertContext } from '../../contexts/AlertContext';
import { useRouter } from 'next/router';
import redirect from '../../utils/redirect';
import Layout from '../../components/common/Layout';

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

const TokenInfo = styled.div`
    font-size: 1.2rem;
    p {
        color: ${({ theme }) => theme.secondaryText};
    }
`;

const ResetPassword = ({ isTokenValid, error }) => {
    const { value: password, bind: bindPassword } = useInput('');
    const { value: confirmPassword, bind: bindConfirmPassword } = useInput('');
    const [ disableBtn, setDisableBtn ] = useState(false);
    const { sendSuccess, sendError } = useContext(AlertContext);
    const router = useRouter();
    const { token } = router.query;

    const savePassword = (e) => {
        e.preventDefault();
        setDisableBtn(true);
        if (password !== confirmPassword) {
            sendError('Password does not match');
            setDisableBtn(false);
            return;
        }

        resetPassword({ password }, token)
            .then(response => {
                sendSuccess(response.message);
                setDisableBtn(false);
            })
            .catch(error => {
                sendError(error.message || error.response.message);
                setDisableBtn(false);
            })
    }

    return (
        <Layout title="Reset Password">
            <Container>
                {
                    isTokenValid ?
                    <>
                        <h2>Reset your password</h2>
                        <form onSubmit={savePassword}>
                            <Label htmlFor="password" margin="0.8rem 0">Enter your new password</Label>
                            <Input type="password" name="password" id="password" placeholder="New password" required {...bindPassword} />
                            <Small>Password must be at least 8 characters long</Small>
                            <Label htmlFor="confirm_password" margin="0.8rem 0">Confirm password</Label>
                            <Input type="password" name="confirm_password" id="confirm_password" placeholder="Confirm Password" required {...bindConfirmPassword} />
                            <PrimaryButton type="submit" disabled={disableBtn}>Save password</PrimaryButton>
                        </form>
                    </> :
                    <TokenInfo>
                        <h3>{error && error.message}</h3>
                        <p>Oops! It seems like the token you requested is either invalid or has expired</p>
                        <StyledLink href="/forgot-password">Send another email?</StyledLink>
                    </TokenInfo>
                }
            </Container>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const user = await isAuthenticated(context);

    if (user.username) {
        redirect('/', context);
    }

    try {
        const isTokenValid = await checkToken(context.params.token);
        if (isTokenValid.ok) {
            return {
                props: {isTokenValid}
            }
        }
    } catch(error) {
        return {
            props: {
                error: error.response
            }
        }
    }
}

export default ResetPassword;