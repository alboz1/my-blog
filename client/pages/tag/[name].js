import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { getPostsByTag } from '../../API';
import BlogPost from '../../components/common/BlogPost';
import TagsSection from '../../components/common/TagsSection';
import { device } from '../../globals';
import { isAuthenticated, getPostById } from '../../API';
import { MainContext } from '../../contexts/MainContext';
import Layout from '../../components/common/Layout';
import { useRouter } from 'next/router';

const FlexContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const BlogsGrid = styled.section`
    flex: 1;
    margin-right: 1rem;
    padding: 0 0.5rem;
    @media ${device.mobile} {
        margin: 0;
    }
`;

const NoPostHeader = styled.h4`
    text-align: center;
    padding: 2rem 0;
`;

const Tag = ({ user, posts, error }) => {
    const { dispatchUserAction } = useContext(MainContext);
    const router = useRouter();
    const { name } = router.query;

    useEffect(() => {
        if (!user.username) return;

        dispatchUserAction({
            type: 'GET_USER',
            username: user.username,
            avatar: user.avatar,
            id: user.id
        });
    }, [])

    return (
        <Layout title={name}>
            <FlexContainer>
                <TagsSection />
                <BlogsGrid>
                    {
                        error ?
                        <NoPostHeader>{error.message}</NoPostHeader> :
                        posts.map((post) => {
                            const date = new Date(post.updatedAt).toDateString();

                            return <BlogPost
                                key={post._id}
                                title={post.title}
                                slug={post.slug}
                                date={date}
                                stretch="true"
                            />
                        })
                    }
                </BlogsGrid>
            </FlexContainer>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const user = await isAuthenticated(context);
    try {
        const posts = await getPostsByTag(context.params.name);
        return {
            props: {
                user,
                posts
            }
        }
    } catch (error) {
        return {
            props: {
                user,
                error: error.response
            }
        }
    }
}

export default Tag;