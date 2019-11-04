import styled from 'styled-components';

export interface CardFormProps
{
    minHeight?: string;
    itemsSpacing?: string;
}

export const CardForm = styled.form<CardFormProps>`
    min-height: ${ ( { minHeight = '300px' } ) => minHeight };
    display: flex;
    align-items: center;

    .form-item {
        margin-top: ${ ( { itemsSpacing = '2rem' } ) => itemsSpacing }
    }
    
    .button-container {
        text-align: center;
    }
   
    .submit-button {
        width: 100%;
    }
    
    .register-container {
        margin-top: 1rem;
    }
    
    .loader-label {
        margin-left: 1rem;
    }
`;
