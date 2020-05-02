import { useState, useEffect } from 'react';

const useClickOutside = (ref) => {
    const [ open, setOpen ] = useState(false);
    
    const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setOpen(false);
        }
    }

    useEffect(() => {
        if (open) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [open])

    return {
        open,
        setOpen
    };
}

export default useClickOutside;