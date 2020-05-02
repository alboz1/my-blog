import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('@stfy/react-editor.js'), { ssr: false });
const Header = typeof window !== 'undefined' && require('@editorjs/header');
const Image = typeof window !== 'undefined' && require('@editorjs/simple-image');
const List = typeof window !== 'undefined'&& require('@editorjs/list');
const Quote = typeof window !== 'undefined'&& require('@editorjs/quote');
const Code = typeof window !== 'undefined'&& require('@editorjs/code');
const InlineCode = typeof window !== 'undefined'&& require('@editorjs/inline-code');
const Embed = typeof window !== 'undefined'&& require('@editorjs/embed');
const Marker = typeof window !== 'undefined'&& require('@editorjs/marker');
const Delimeter = typeof window !== 'undefined'&& require('@editorjs/delimiter');
import { Label } from './Input';
import { defaultBoxShadow } from '../../globals/theme';

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