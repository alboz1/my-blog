import { useState, useEffect, useContext } from 'react';
import { AlertContext } from '../contexts/AlertContext';
import { MainContext } from '../contexts/MainContext';

//custom hook to lazy load posts for different pages
const useGetPosts = (getPosts, page, username, dashboard) => {
    const { dispatchPostAction } = useContext(MainContext);
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
                    if (dashboard) {
                        dispatchPostAction({ type: 'GET_BLOGS', payload: blogPosts });
                    } else {
                        setPosts(() => {
                            return [...posts, ...blogPosts]
                        });
                    }
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