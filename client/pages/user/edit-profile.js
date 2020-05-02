import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input, Label } from '../../components/ui/Input';
import { PrimaryButton } from '../../components/ui/Button';
import InputFile from '../../components/common/InputFile';
import { MainContext } from '../../contexts/MainContext';
import { AlertContext } from '../../contexts/AlertContext';
import useInput from '../../hooks/useInput';
import { editUser } from '../../API';
import { isAuthenticated } from '../../API';
import { privateRoute } from '../../utils/privateRoute';
import { useRouter } from 'next/router';
import Layout from '../../components/common/Layout';

const EditProfileGrid = styled.div`
    max-width: 800px;
    margin: 0 auto;
`;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const EditProfile = ({ user }) => {
    const { dispatchUserAction } = useContext(MainContext);
    const { value: avatar, setValue: setAvatar } = useInput('');
    const { value: username, setValue: setUsername } = useInput('');
    const { sendSuccess, sendError } = useContext(AlertContext);
    const [ disableBtn, setDisableBtn ] = useState(false);
    const router = useRouter();

    let ignore = false;

    useEffect(() => {
        dispatchUserAction({
            type: 'GET_USER',
            username: user.username,
            avatar: user.avatar,
            id: user.id
        });

        setAvatar(user.avatar || '');
        setUsername(user.username);

        return () => ignore = true;
    }, [ignore])

    const changeProfileImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
        }
    
        reader.onloadend = () => {
            setAvatar(reader.result);
        };
    }

    const removeImage = () => {
        setAvatar('');
    }

    const saveProfile = (e) => {
        e.preventDefault();
        setDisableBtn(true);
        editUser({
            username,
            avatar
        }).then(response => {
            if (!ignore) {
                sendSuccess(response.message);
                setDisableBtn(false);
                router.replace(`/user/${username}`);
            }
        })
        .catch(error => {
            if (!ignore) {
                sendError(error.message || error.response.message);
                setDisableBtn(false);
            }
        });
    }

    return (
        <Layout title="Edit Profile">
            <EditProfileGrid>
                <form onSubmit={saveProfile}>
                    <Header>
                        <h2>Edit Profile</h2>
                        <PrimaryButton type="submit" disabled={disableBtn}>
                            { disableBtn ? 'Saving' : 'Save' }
                        </PrimaryButton>
                    </Header>
                
                    <Label htmlFor="username">Username</Label>
                    <Input
                        mb
                        tpye="text"
                        name="username"
                        id="username"
                        defaultValue={user.username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <InputFile
                        htmlFor="profile"
                        handleOnChange={changeProfileImage}
                        handleRemoveImage={removeImage}
                        image={avatar}
                    />
                </form>
            </EditProfileGrid>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const user = await isAuthenticated(context);
    privateRoute(user, context);

    return {
        props: {user}
    }
}

export default EditProfile;