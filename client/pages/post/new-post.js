import { useContext, useEffect } from 'react';
import Router from 'next/router';
import Editor from '../../components/Editor';
import { isAuthenticated } from '../../API';
import { MainContext } from '../../contexts/MainContext';
import { privateRoute } from '../../utils/privateRoute';

const NewPost = ({ user }) => {
    const { dispatchUserAction } = useContext(MainContext);
    
    useEffect(() => {
        dispatchUserAction({
            type: 'GET_USER',
            username: user.username,
            avatar: user.avatar,
            id: user.id
        });
    }, [])

    return <Editor />
}

export async function getServerSideProps(context) {
    const user = await isAuthenticated(context);
    privateRoute(user, context);

    return {
        props: {user}
    }
}

export default NewPost;