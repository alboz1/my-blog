import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import useObserver from '../hooks/useObserver';
import { DialogProvider } from '../contexts/DialogContext';
import { MainContext } from '../contexts/MainContext';
import { getDashboardPosts, isAuthenticated } from '../API';
import { privateRoute } from '../utils/privateRoute';
import Table from '../components/Table';
import { PrimaryButton } from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import { device } from '../globals';
import { StyledLink } from '../components/ui/Link';
import Layout from '../components/common/Layout';

const DashboardHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    	
    @media ${device.mobile} {
        font-size: 0.9em;
    }
`;	

const NoPostsInfo = styled.section`
    max-width: 350px;
    margin: 0 auto;
    text-align: center;
    @media ${device.mobile} {
        max-width: 200px;
        h2 {
            font-size: 1.3em;
        }
    }
`;	

const Image = styled.img`
    width: 100%;
`;

const Dashboard = ({ user }) => {
    const { posts, loading, loadingEl, hasMore } = useObserver(getDashboardPosts);
    const { dashboardPosts, dispatchPostAction, dispatchUserAction } = useContext(MainContext);

    useEffect(() => {
        dispatchPostAction({ type: 'GET_BLOGS', payload: posts });
        dispatchUserAction({
            type: 'GET_USER',
            username: user.username,
            avatar: user.avatar,
            id: user.id
        });
    }, [posts, user])

    return (
        <Layout title="Dashboard">
            <DialogProvider>	
                <>
                    <DashboardHeader>
                        <h2>Dashboard</h2>
                        <StyledLink href="/post/new-post">
                            <PrimaryButton>New Post</PrimaryButton>
                        </StyledLink>
                    </DashboardHeader>
                    {
                        loading && !hasMore ?
                        <Loader /> :
                        dashboardPosts.length ?
                        <Table /> :
                        <NoPostsInfo>
                            <Image src="/undraw_no_data_qbuo.svg" alt="No posts" />
                            <h2>You have no posts</h2>
                        </NoPostsInfo>
                    }
                    {
                        hasMore &&
                        <div ref={loadingEl}>
                            <Loader />
                        </div>
                    }
                </>
            </DialogProvider>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const user = await isAuthenticated(context);
    privateRoute(user, context);

    return {
        props: {user}
    }
}

export default Dashboard;
