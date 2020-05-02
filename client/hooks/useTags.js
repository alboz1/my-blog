import { useState, useEffect, useContext } from 'react';
import { getTags } from '../API';
import { AlertContext } from '../contexts/AlertContext';

const useTags = () => {
    const [ tags, setTags ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const { sendError } = useContext(AlertContext);
    let ignore = false;

    useEffect(() => {
        setLoading(true);
        getTags()
            .then(tags => {
                if (!ignore) {
                    setTags(tags);
                    setLoading(false);
                }
            })
            .catch(error => {
                if (!ignore) {
                    sendError(error.message);
                    setLoading(false);
                }
            });
        return () => ignore = true;
    }, [ignore])

    return {
        tags,
        loading
    };
}

export default useTags;