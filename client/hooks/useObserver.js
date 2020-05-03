import { useState, useCallback, useRef, useEffect } from 'react';
import useGetPosts from './useGetPosts';

//hook that creates an intersection observer to update the page for lazy loading posts
const useObserver = (getPosts, username, dashboard) => {
    const [ page, setPage ] = useState(0);
    const { posts, loading, hasMore } = useGetPosts(getPosts, page, username, dashboard);
    const observer = useRef();

    useEffect(() => {
        posts.splice(0, posts.length);
        setPage(0);
    }, [username])

    const loadingEl = useCallback(node => {
        if (loading) return;
        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasMore) {
                    setPage(prevPage => prevPage + 1);
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.7
            }
        );
        if (node) {
            observer.current.observe(node);
        }
    }, [loading, hasMore])

    return {
        posts,
        loadingEl,
        loading,
        hasMore
    }
}

export default useObserver;