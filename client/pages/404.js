import React, { useEffect, useContext } from 'react';
import NotFound from "../components/common/NotFound";
import { isAuthenticated } from '../API';
import { MainContext } from '../contexts/MainContext';
import Layout from '../components/common/Layout';

const NotFoundPage = () => {
    const { user, dispatchUserAction } = useContext(MainContext);
    let ignore = false;

    useEffect(() => {
        if (!user.isLoggedIn) {
            isAuthenticated()
                .then(user => {
                    if (!ignore && user) {
                        dispatchUserAction({
                            type: 'GET_USER',
                            username: user.username,
                            avatar: user.avatar,
                            id: user.id
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }

        return () => ignore = true;
    }, [])

    return (
        <Layout title="404">
            <NotFound />
        </Layout>
    )
}

export default NotFoundPage;
