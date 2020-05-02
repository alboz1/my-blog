import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { useRouter } from 'next/router';
import { MainContext } from '../contexts/MainContext';

//private route for client side rendering
const PrivateRoute = (Component) => {
    return ({ ...props }) => {
        const { user, dispatchUserAction } = useContext(MainContext);
        const [ loading, setLoading ] = useState(true);
        const router = useRouter();
    
        useEffect(() => {
            if (!user.isLoggedIn) {
                fetch(`${process.env.API_URL}/api/user/`, {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'include'
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error(response.statusText);
                    }
                })
                .then(user => {
                    dispatchUserAction({
                        type: 'GET_USER',
                        username: user.username,
                        avatar: user.avatar,
                        id: user.id
                    });
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error);
                    setLoading(false);
                });
            }
        }, [])

        if (!loading && !user.isLoggedIn) router.replace('/login');

        return (
            <>
                { user.isLoggedIn && <Component { ...props } />}
            </>
        );
    }
}

export default PrivateRoute;