import Editor from '../../components/Editor';
import PrivateRoute from '../../components/PrivateRoute';

const NewPost = () => {
    return <Editor />
}

export default PrivateRoute(NewPost);