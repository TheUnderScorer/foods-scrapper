import * as React from 'react';
import { createGlobalStyle } from 'styled-components';
import card from './styles/card';

export default createGlobalStyle`
    body {
        margin: 0;
    }
    
    ${ card }
`;
