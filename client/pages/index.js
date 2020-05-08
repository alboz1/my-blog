import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { MainContext } from '../contexts/MainContext';
import BlogPost from '../components/common/BlogPost';
import HomeHeader from '../components/HomeHeader';
import Placeholder from '../components/common/Placeholder';
import { device } from '../globals';
import { getPublishedBlogPosts, isAuthenticated } from '../API';
import useObserver from '../hooks/useObserver';
import Layout from '../components/common/Layout';

const Container = styled.section`
    max-width: 900px;
`;

const PostsSection = styled.section`
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    flex-wrap: wrap;
    @media ${device.mobile} {
        display: block;
    }
`;

const Home = ({ user }) => {
    const { posts, loadingEl, loading, hasMore } = useObserver(getPublishedBlogPosts);
    const { dispatchUserAction } = useContext(MainContext);

    useEffect(() => {
        if (user.username) {
            dispatchUserAction({
                type: 'GET_USER',
                username: user.username,
                avatar: user.avatar,
                id: user.id
            });
        }
    }, [])

    return (
        <Layout>
            <Container>
                <HomeHeader />
                <PostsSection>
                    {
                        loading && !hasMore ? (
                            <>
                                <Placeholder placeholderFor='blogPost'/>
                                <Placeholder placeholderFor='blogPost'/>
                                <Placeholder placeholderFor='blogPost'/>
                                <Placeholder placeholderFor='blogPost'/>
                                <Placeholder placeholderFor='blogPost'/>
                                <Placeholder placeholderFor='blogPost'/>
                            </>
                        ) :
                        posts.map((post, index) => {
                            const date = new Date(post.updatedAt).toDateString();
                            const JSONBody = JSON.parse(post.body);
                            const body = Object.keys(JSONBody).length ? JSONBody.blocks[0].data.text : null;
                            return <BlogPost
                                    key={index}
                                    title={post.title}
                                    slug={post.slug}
                                    date={date}
                                    body={body}
                                />
                        })
                    }
                   
                    {
                        hasMore ?
                        <div ref={loadingEl}>
                            <Placeholder placeholderFor='blogPost'/>
                        </div> :
                        null
                    }
                </PostsSection>
            </Container>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const user = await isAuthenticated(context);

    return {
        props: {user}
    }
}

export default Home;