import { useRouter } from 'next/router';
import Editor from '../../../components/Editor';
import PrivateRoute from '../../../components/PrivateRoute';

const EditPost = () => {
    const router = useRouter();
    //get post id
    const { id } = router.query;

    return <Editor postId={id}/>
}

export default PrivateRoute(EditPost);