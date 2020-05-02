import { useState, useEffect, useContext } from 'react';
import { AlertContext } from '../contexts/AlertContext';

//custom hook to lazy load posts for different pages
const useGetPosts = (getPosts, page, username) => {
    const [ posts, setPosts ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ hasMore, setHasMore ] = useState(false);
    const { sendError } = useContext(AlertContext);
    let ignore = false;

    useEffect(() => {
        setLoading(true);
        getPosts(page, username)
            .then(blogPosts => {
                if (!ignore) {
                    setPosts(prevPosts => {
                        return [...prevPosts, ...blogPosts]
                    });
                    setHasMore(blogPosts.length > 0);
                    setLoading(false);
                }
            }).catch(error => {
                if (!ignore) {
                    setLoading(false);
                    sendError(error.message || error.response.message);
                }
            });

        return () => ignore = true;
    }, [username, page])

    return {
        posts,
        loading,
        hasMore
    }
}

export default useGetPosts;