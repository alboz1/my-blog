import { useRouter } from 'next/router';
import Editor from '../../../components/Editor';
import { isAuthenticated } from '../../../API';
import { privateRoute } from '../../../utils/privateRoute';
import { useContext, useEffect } from 'react';
import { MainContext } from '../../../contexts/MainContext';

const EditPost = ({ user }) => {
    const { dispatchUserAction } = useContext(MainContext);
    const router = useRouter();
    //get post id
    const { id } = router.query;

    useEffect(() => {
        dispatchUserAction({
            type: 'GET_USER',
            username: user.username,
            avatar: user.avatar,
            id: user.id
        });
    }, [])

    return <Editor postId={id}/>
}

export async function getServerSideProps(context) {
    const user = await isAuthenticated(context);
    privateRoute(user, context);

    return {
        props: {user, }
    }
}

export default EditPost;