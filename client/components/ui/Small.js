import styled from 'styled-components';

export const Small = styled.small`
    color: ${({ theme }) => theme.secondaryText};
    font-size: ${({ fontSize }) => fontSize || '0.7em'};
    display: block;
    margin: 0.7rem 0;
    font-weight: 400;
`;