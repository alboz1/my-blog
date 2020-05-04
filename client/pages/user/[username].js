import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import Layout from '../../components/common/Layout';
import BlogPost from '../../components/common/BlogPost';
import Placeholder from '../../components/common/Placeholder';
import useObserver from '../../hooks/useObserver';
import { getUserInfo, getProfilePosts, isAuthenticated } from '../../API';
import { device } from '../../globals';
import NotFound from '../../components/common/NotFound';
import { StyledLink } from '../../components/ui/Link';
import { MainContext } from '../../contexts/MainContext';
import DefaultAvatar from '../../components/common/DefaultAvatar';

const Header = styled.header`
    border-bottom: 1px solid ${({ theme }) => theme.lightGrey};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3.5rem 0;
    
    @media ${device.mobile} {
        display: block;
        text-align: center;
        padding: 2.5rem 0;
    }
`;

const Avatar = styled.div`
    background: ${({ theme }) => theme.lightGrey};
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-right: 2rem;
    overflow: hidden;
    img {
        width: auto;
        height: 100%;
    }

    @media ${device.mobile} {
        margin: 0 auto;
    }
`;

const PostsGrid = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 2rem;

    @media ${device.mobile} {
        margin-top: 1.5rem;
    }
`;

const ImageWrapper = styled.div`
	max-width: 250px;
	margin: 0 auto;
    text-align: center;
	img {
		width: 100%;
	}
`;

const Profile = ({ user, userInfo }) => {
    if (!userInfo) return <NotFound />
    const { dispatchUserAction } = useContext(MainContext);
    const { posts, loadingEl, loading, hasMore } = useObserver(getProfilePosts, userInfo.username);

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
        <Layout title={userInfo.username}>
            <div>
                <Header>
                    <>
                        <div>
                            <Avatar>
                                {
                                    userInfo.avatar ?
                                    <img src={userInfo.avatar} alt={userInfo.username} /> :
                                    <DefaultAvatar />
                                }
                            </Avatar>
                        </div>
                        <div>
                            <h1> { userInfo.username }</h1>
                            {
                                user.id === userInfo._id &&
                                <StyledLink href="/user/edit-profile">
                                    Edit Profile
                                </StyledLink>
                            }
                        </div>
                    </>
                </Header>
                <PostsGrid>
                    {
                        loading && !hasMore ? (
                            <>
                                <Placeholder placeholderFor='blogPost'/>
                                <Placeholder placeholderFor='blogPost'/>
                            </>
                        ) :
                        posts && posts.length ?
                        posts.map(post => (
                            <BlogPost
                                key={post._id}
                                slug={post.slug}
                                title={post.title}
                                date={ new Date(post.updatedAt).toDateString() }
                            />
                        )) :
                        <ImageWrapper>
                            <img src="/undraw_no_data_qbuo.svg" alt="no posts" />
                            <h2>
                                {
                                    userInfo.username === user.username ?
                                    'You have no posts' :
                                    userInfo.username + ' has no posts'
                                }
                            </h2>
                        </ImageWrapper>
                    }

                    {
                        hasMore ?
                        <div ref={loadingEl}>
                            <Placeholder placeholderFor='blogPost'/>
                        </div> :
                        null
                    }
                </PostsGrid>
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const user = await isAuthenticated(context);
    try {
        const userInfo = await getUserInfo(context.params.username);
        return {
            props: {user, userInfo}
        }
    } catch(error) {
        return {
            props: {user, userInfo: null}
        }
    }
}


export default Profile;