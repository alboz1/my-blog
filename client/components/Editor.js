import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { AlertContext } from '../contexts/AlertContext';
import { createBlogPost, updateBlogPost, getPostById } from '../API';
import InputFile from './common/InputFile';
import { PrimaryButton } from './ui/Button';
import { Input, Label } from './ui/Input';
import { defaultBoxShadow } from '../globals/theme';
import EditorJS from './ui/EditorJS';
import { device } from '../globals';
import Layout from './common/Layout';

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @media ${device.mobile} {
    display: block;
  }
`;

const EditorContainer = styled.section`
  background: ${({ theme }) => theme.sidebarBg};
  border-radius: 5px;
  box-shadow: ${defaultBoxShadow};
  flex: 1 600px;
  max-width: 600px;
  height: 100%;
  padding: 1.3rem;
`;

const HeaderImgContainer = styled.div`
  flex: 1;
  align-self: flex-start;
  text-align: center;
  margin-left: 2rem;
  position: sticky;
  top: 15px;
  
  @media ${device.mobile} {
    margin: 2rem 0 0 0;
    position: relative;
    top: 0;
    width: 100%;
  }
`;

const BlogEditor = ({ postId }) => {
  const { value: blogTitle, bind: bindBlogTitle, setValue: setBlogTitle } = useInput('');
  const { value: tags, bind: bindTagsInput, setValue: setTags } = useInput('');
  //hook for getting the img from input type file
  const { value: blogHeader, setValue: setblogHeader } = useInput('');
  const { sendSuccess, sendError, closeAlert } = useContext(AlertContext);
  const [ editorState, setEditorState ] = useState({});
  const [ initEditor, setInitEditor ] = useState(false);
  const [ disableBtn, setDisableBtn ] = useState(false);
  let ignore = false;

  useEffect(() => {
    if (postId) {
      getPostById(postId)
        .then(post => {
          if (!ignore) {
            const { tags, title, body, img } = post;
            setBlogTitle(title);
            setblogHeader(img);
            setEditorState(JSON.parse(body));
            setTags(tags.join(' '));
            setInitEditor(true);
          }
        })
        .catch(error => {
          sendError(error.message || error.response.message);
        })
    }
    return () => ignore = true;
  }, [ignore])

  const handleRemoveImage = () => {
    setblogHeader('');
  }

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }

    reader.onloadend = () => {
      setblogHeader(reader.result);
    };
  }

  const handleSubmit = () => {
    closeAlert();
    setDisableBtn(true);
    const body = {
      title: blogTitle,
      body: JSON.stringify(editorState),
      img: blogHeader,
      tags:  tags ? tags.split(' ') : []
    };

    if (postId) {
      updateBlogPost(body, postId)
        .then(data => {
          if (!ignore) {
            sendSuccess(data.success);
            setDisableBtn(false);
          }
        }).catch(error => {
          if (!ignore) {
            sendError(error.message || error.response.message);
            setDisableBtn(false);
          }
        });
    } else {
      createBlogPost(body)
        .then(data => {
          if (!ignore) {
            sendSuccess(data.success);
            setDisableBtn(false);
          }
        }).catch(error => {
          if (!ignore) {
            sendError(error.message || error.response.message);
            setDisableBtn(false);
          }
      });
    }
  }

  return (
      <Layout title="Editor">
        <h2>Editor</h2>
        <FlexContainer>
            <EditorContainer>
            <Label htmlFor="title">Title</Label>
            <Input mb type="text" id="title" name="title" placeholder="Title" value={ blogTitle } { ...bindBlogTitle } />
            <EditorJS
                setInitEditor={ setInitEditor }
                setEditorState={ setEditorState }
                editorState={ editorState }
                initEditor={ initEditor }
            />
            <Label htmlFor="tags">Tags</Label>
            <Input mb type="text" id="tags" placeholder="Put some tags. Divide them by space" value={tags} { ...bindTagsInput } />
            </EditorContainer>

            <HeaderImgContainer>
            <PrimaryButton onClick={handleSubmit} wide big margin="0 0 1.7rem 0" disabled={disableBtn}>
                Save
            </PrimaryButton>
            <InputFile 
                htmlFor="header"
                handleOnChange={handleImgChange}
                handleRemoveImage={handleRemoveImage}
                image={blogHeader}
            />
            </HeaderImgContainer>
        </FlexContainer>
      </Layout>
  );
}

export default BlogEditor;