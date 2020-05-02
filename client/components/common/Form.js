import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 450px;
    margin: 0 auto;
`;

const Container = styled.div`
    max-width: 700px;
    margin: 0 auto;
`;

const Form = ({children, handleSubmit}) => {
    return (
        <Container>
            <StyledForm onSubmit={handleSubmit}>
                {children}
            </StyledForm>
        </Container>
    );
}

export default Form;