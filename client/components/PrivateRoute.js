import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../contexts/MainContext';
import redirect from '../utils/redirect';
import { isAuthenticated } from '../API';

//private route for client side rendering
const PrivateRoute = (Component) => {
    return ({ ...props }) => {
        const { user, dispatchUserAction } = useContext(MainContext);
        const [ loading, setLoading ] = useState(true);
    
        useEffect(() => {
            if (!user.isLoggedIn) {
                isAuthenticated()
                    .then(loggedInUser => {
                        if (loggedInUser) {
                            dispatchUserAction({
                                type: 'GET_USER',
                                username: loggedInUser.username,
                                avatar: loggedInUser.avatar,
                                id: loggedInUser.id
                            });
                        }
                        setLoading(false);
                    })
                    .catch(error => {
                        console.log(error);
                        setLoading(false);
                    });
            }
        }, [])

        if (!loading && !user.isLoggedIn) redirect('/login');

        return (
            <>
                { user.isLoggedIn && <Component { ...props } /> }
            </>
        );
    }
}

export default PrivateRoute;