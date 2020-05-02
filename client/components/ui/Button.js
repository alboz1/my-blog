import styled from 'styled-components';
import { btnShadow } from '../../globals/theme';

export const DefaultButton = styled.button.attrs(({ wide, margin, ml }) => ({
    wide: wide && '100%',
    margin: margin,
    ml: ml && '1.3rem',
}))`
    background: none;
    border: none;
    cursor: pointer;
    color: ${({ greyColor, theme }) => greyColor ? theme.links : theme.primaryText};
    margin: ${({ margin, ml, small }) => ml || small ? '0' : margin || '1.5rem 0'};
    margin-left: ${({ ml }) => ml};
    padding: 0;
    width: ${({ wide }) => wide};
`;

export const PrimaryButton = styled(DefaultButton)`
    background: ${({ theme, disabled }) => disabled ? disabled : theme.primary.default};
    border-radius: 5px;
    box-shadow: ${btnShadow} ${({ theme }) => theme.primary.rgba};
    color: ${({ theme }) => theme.btnText.default};
    padding: ${({ small, big }) => small ? '0.6rem 1rem' : big ? '0.8rem 1.4rem' : '0.6rem 1.4rem'};
    font-size: ${({ small }) => small ? '0.8em' : '1em'};
    transition: all 0.2s ease;
    width: ${({ wide }) => wide};

    &:disabled {
        background: ${({ theme }) => theme.lightGrey};
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        border: 1px solid rgba(0, 0, 0, 0.05);
        color: ${({ theme }) => theme.btnText.disabled};
        cursor: wait;
    }
    
    &:hover:not(:disabled) {
        background: ${({ theme }) => theme.primary.hover};
    }
`;

export const SecondaryButton = styled(PrimaryButton)`
    background: ${({ theme }) => theme.secondary.default};
    border: 1px solid ${({ theme }) => theme.secondary.border};
    box-shadow: ${btnShadow} ${({ theme }) => theme.secondary.rgba};
    color: ${({ theme }) => theme.primaryText};
    &:hover:not(:disabled) {
        background: ${({ theme }) => theme.secondary.hover};
    }
`;

export const DeleteButton = styled(PrimaryButton)`
    background: ${({ theme }) => theme.danger.default};
    box-shadow: ${btnShadow} ${({ theme }) => theme.danger.rgba};
    &:hover:not(:disabled) {
        background: ${({ theme }) => theme.danger.hover};
    }
`;

export const CloseButton = styled(DefaultButton)`
    svg {
        stroke: ${({ theme, white }) => white ? theme.btnText.default : theme.links};
        transition: 0.2s ease-out;
    }
    &:hover svg {
        stroke: ${({ theme, white }) => white ? '' : theme.linksHover};
    }
`;