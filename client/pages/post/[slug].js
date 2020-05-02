import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import CommentSection from '../../components/CommentSection';
import { StyledLink, TagLink } from '../../components/ui/Link';
import { Small } from '../../components/ui/Small';
import RenderHTML from '../../components/common/RenderHTML';
import { device } from '../../globals';
import NotFound from '../../components/common/NotFound';
import { getPost, isAuthenticated } from "../../API";
import { MainContext } from '../../contexts/MainContext';
import Layout from '../../components/common/Layout';

const Template = styled.section`
    box-sizing: border-box;
    color: ${({ theme }) => theme.primaryText};
    max-width: 800px;
    margin: 0 auto;

    @media ${device.mobile} {
        padding: 0 0.8rem;
    }
`;

const TemplateHeader = styled.header`
    padding: 2rem 0;
    font-size: 1.5em;
    border-bottom: 1px solid ${({ theme }) => theme.lightGrey};
    img {
        width: 100%;
    }

    @media ${device.mobile} {
        h1 {
            font-size: 1.3em;
        }
    }
`;

const TemplateBody = styled.section`
    margin: 2rem auto;
    font-size: 1.2em;
    h1 {
        font-size: 1.5em;
        @media ${device.mobile} {
            font-size: 1.3em;
        }
    }
    p {
        line-height: 1.7rem;
        white-space: pre-wrap;
        overflow-wrap: break-word;
    }
    a {
        color: ${({ theme }) => theme.primary.default};
        text-decoration: underline;
    } 
    a:hover {
        text-decoration: none;
    }

    @media ${device.mobile} {
        font-size: 1.05em;
    }
`;

const BlogInfo = styled.div`
    font-weight: 600;
    font-size: 0.9em;
    margin-bottom: 2rem;
`;

const TagsSection = styled.section`
    margin: 3rem 0;
`;

const Post = ({ post, user, error }) => {
    const { dispatchUserAction } = useContext(MainContext);

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
        <Layout title={post.title}>
            {
                error ?
                <NotFound /> :
                <Template>
                    <>
                        <TemplateHeader>
                            <h1>{ post.title }</h1>
                            <BlogInfo>
                                <StyledLink bold="true" href={`/user/${post.author}`}>{ post.author }</StyledLink>
                                <Small>{ new Date(post.updatedAt).toDateString() }</Small>
                            </BlogInfo>
                            { post.img ? <img src={ post.img } alt="post-header" /> : null }
                        </TemplateHeader>

                        <TemplateBody>
                            <RenderHTML blocks={JSON.parse(post.body).blocks}/>
                        </TemplateBody>
                        <TagsSection>
                            {
                                post.tags.map((tag, index) => {
                                    return <TagLink
                                                className="tag"
                                                href={`/tag/${tag}`}
                                                key={index}>
                                                {tag}
                                            </TagLink>
                                })
                            }
                        </TagsSection>
                        <CommentSection
                            postId={ post._id }
                            postOwnerId={ post.userId }
                        />
                    </>
                </Template>
            }
        </Layout>  
    );
}

export async function getServerSideProps(context) {
    const user = await isAuthenticated(context);
    try {
        const post = await getPost(context.params.slug);
        return {
            props: {post, user}
        }
    } catch(error) {
        return {
            props: {user, error: error.response.message}
        }
    }
    
}

export default Post;