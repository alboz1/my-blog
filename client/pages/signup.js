import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import Form from '../components/common/Form';
import { signupUser, isAuthenticated } from '../API';
import useInput from '../hooks/useInput';
import { Input, Label } from '../components/ui/Input';
import { PrimaryButton } from '../components/ui/Button';
import { Small } from '../components/ui/Small';
import InputFile from '../components/common/InputFile';
import { AlertContext } from '../contexts/AlertContext';
import { device } from '../globals';
import redirect from '../utils/redirect';
import Layout from '../components/common/Layout';

const Header = styled.h2`
    text-align: center;
    margin: 2.6rem 0;
`;

const FlexGrid = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const FormGrid = styled.section`
    flex: 1;
`;

const ProfileImage = styled.section`
    flex: 0 350px;
    @media ${device.mobile} {
        flex: 1 350px;
        width: 100%;	
    }
`;

const SignUp = () => {
    const {value: username, bind: bindUsername} = useInput('');
    const {value: email, bind: bindEmail} = useInput('');
    const {value: password, bind: bindPassword, reset: resetPassword} = useInput('');
    const {value: confirmPassword, bind: bindConfirmPassword, reset: resetConfirmPassword} = useInput('');
    const {value: avatar, setValue} = useInput('');
    const { sendError, sendSuccess, closeAlert } = useContext(AlertContext);
    const [loading, setLoading] = useState(false);
    let ignore = false;

    useEffect(() => {
        return () => ignore = true;
    }, [ignore])

    const handleChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
        }

        reader.onloadend = () => {
            setValue(reader.result);
        };
    }

    const removeImage = () => {
        setValue('');
    }

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);
        closeAlert();

        if (password !== confirmPassword) {
            setLoading(false);
            sendError('Password does not match');
            resetConfirmPassword();
            resetPassword();
            return;
        }

        signupUser({
            username,
            email,
            password,
            avatar
        })
        .then(data => {
            if (!ignore) {
                sendSuccess(data.message);
                setLoading(false);
            }
        })
        .catch(error => {
            if (!ignore) {
                sendError(error.message || error.response.message);
                setLoading(false);
            }
        });
    }

    return (
        <Layout title="Sign Up">
            <Header>Sign Up</Header>
            <FlexGrid>
                <FormGrid>
                    <Form handleSubmit={handleSubmit}>
                        <Label margin="0 0 0.9rem 0" htmlFor="username">Username</Label>
                        <Input type="text" name="username" id="username" {...bindUsername} placeholder="Username" required />
                        <Small>Username must be at least 3 characters long</Small>
                        <Label margin="0.9rem 0" htmlFor="email">Email</Label>
                        <Input type="text" name="email" id="email" {...bindEmail} placeholder="Email" required />
                        <Label margin="0.9rem 0" htmlFor="password">Password</Label>
                        <Input type="password" name="password" id="password" {...bindPassword} placeholder="Password" required />
                        <Small>Password must be at least 8 characters long</Small>
                        <Label margin="0.9rem 0" htmlFor="confirm-password">Confirm password</Label>
                        <Input type="password" name="confirm-password" id="confirm-password" {...bindConfirmPassword} placeholder="Confirm Password" required />

                        <PrimaryButton type="submit" disabled={loading}>
                            Sign Up
                        </PrimaryButton>
                    </Form>
                </FormGrid>
                <ProfileImage>
                    <InputFile
                        htmlFor="profile"
                        handleOnChange={handleChange}
                        handleRemoveImage={removeImage}
                        image={avatar}
                    />
                </ProfileImage>
            </FlexGrid>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const user = await isAuthenticated(context);

    if (user.username) {
        redirect(`/user/${user.username}`, context);
    } else {
        return {
            props: {}
        }
    }
}

export default SignUp;
