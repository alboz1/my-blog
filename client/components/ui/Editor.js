import React from 'react';
import styled from 'styled-components';
import Editor from '@stfy/react-editor.js';
import Header from '@editorjs/header';
import Image from '@editorjs/simple-image';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import Code from '@editorjs/code';
import InlineCode from '@editorjs/inline-code';
import Embed from '@editorjs/embed';
import Marker from '@editorjs/marker';
import Delimeter from '@editorjs/delimiter';
import { Label } from './Input';
import { defaultBoxShadow } from './theme';

const EditorContainer = styled.section.attrs(({ id }) => ({
    id: id
}))`
    background: ${({ theme }) => theme.inputBg};
    box-sizing: border-box;
    box-shadow: ${defaultBoxShadow};
    border-radius: 5px;
    color: ${({ theme }) => theme.primaryText};
    height: 450px;
    font-size: 1em;
    width: 100%;
    overflow: auto;
    margin-bottom: 1.5rem;
    padding: 1rem;

    .ce-paragraph[data-placeholder]:empty::before {
        color: ${({ theme }) => theme.secondaryText};
    }
    .ce-inline-toolbar__dropdown svg > path, #toggler-down > path {
        fill: #383D4B;
    }
    .ce-conversion-toolbar {
        color: #383D4B;
    }

    &:focus {
        box-shadow: ${defaultBoxShadow}, 0 0 0 3px rgba(54, 112, 229, 0.5);
    }
`;

const EditorJS = ({ editorState, setEditorState, initEditor, setInitEditor }) => {
    return (
        <>
            <Label htmlFor="editorjs-container">Body</Label>
            <EditorContainer id="editorjs-container" />
            <Editor
                tools={{
                    header: Header,
                    image: Image,
                    list: List,
                    inlineCode: InlineCode,
                    code: Code,
                    quote: Quote,
                    embed: Embed,
                    marker: Marker,
                    delimeter: Delimeter
                }}
                placeholder="Start typing..."
                holder="editorjs-container"
                onReady={ () => setInitEditor(false) }
                onData={ (data) => setEditorState(data) }
                data={ editorState }
                reinitOnPropsChange={ initEditor }
            />
        </>
    );
}

export default EditorJS;