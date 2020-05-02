import styled from 'styled-components';
import { defaultBoxShadow } from '../../globals/theme';

export const Input = styled.input`
    background: ${({ theme }) => theme.inputBg};
    border: none;
    border-radius: 5px;
    box-shadow: ${defaultBoxShadow};
    box-sizing: border-box;
    color: ${({ theme }) => theme.primaryText};
    margin-bottom: ${({ mb }) => mb && '1.5rem'};
    padding: 1rem 0.7rem;
    width: 100%;
    &:last-child {
        margin-bottom: 0;
    }
    &::placeholder {
        color: ${({ theme }) => theme.secondaryText};
        font-size: 0.95em;
    }
    &:focus {
        outline: none;
        box-shadow: ${defaultBoxShadow}, 0 0 0 3px rgba(54, 112, 229, 0.5);
    }
`;

export const Label = styled.label`
    color: ${({ theme }) => theme.secondaryText};
    display: inline-block;
    margin: ${({ margin }) => margin || '0 0 0.7rem 0'};
    font-size: 1em;
`;

export const FileInputLabel = styled(Label)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
`;

export const FileInput = styled.input`
    color: transparent;
    visibility: hidden;
    display: inline-block;
    width: 100%;
    & + label > svg {
        display: 'inline-block';
        vertical-align: middle;
        stroke: ${({ theme }) => theme.secondaryText};
        transition: transform 0.2s ease;
    }
    & + label > span {
        display: block;
        margin-top: 0.8rem;
    }
    &:hover + label {
        color: ${({ theme }) => theme.linksHover};
    }
`;

export const TextArea = styled.textarea`
    background: ${({ theme, blueBg }) => blueBg ? theme.inputBg : theme.bg};
    border: none;
    border-radius: 5px;
    box-shadow: ${defaultBoxShadow};
    box-sizing: border-box;
    color: ${({ theme }) => theme.primaryText};
    resize: vertical;
    min-height: 100px;
    padding: 1rem 0.7rem;
    margin-bottom: ${({ mb }) => mb && '1.1rem'};
    width: 100%;
    &::placeholder {
        color: ${({ theme }) => theme.secondaryText};
        font-size: 0.95em;
    }
    &:focus {
        outline: none;
        box-shadow: ${defaultBoxShadow}, 0 0 0 3px rgba(54, 112, 229, 0.5);
    }
`;