import styled from 'styled-components';
import { Grid } from '@material-ui/core';

export const ErrorBox = styled( Grid )`
        background: ${ props => props.theme.palette.error.main };
        padding: 1rem;
        margin-bottom: 2rem !important;
        
        * {
            color: ${ props => props.theme.palette.common.white }
        }
`;
